---
layout: post
title: Creating a simple Alexa skill
summary: How I created the bMotion cracker-pulling skill for Alexa
---
Creating a skill for Alexa is reasonably straightforward once you get your head around the main concepts. The cracker-pulling skill is simpler than most as it does not have any kind of conversational flow - it always answers your query and that's the end of the interaction. There's no way to pose an incomplete query to the skill so that it has to prompt for more information. This probably makes it a good skill to look at to start with as it omits some complexity.

This walkthrough won't cover the complete code used in my skill (because a lot of it isn't Alexa-specific), but will show you how to fit all the moving parts together to make your own skill.

## What we're creating

[bMotion](https://github.com/jamesoff/bmotion) is my eggdrop script for Artificial Stupidity, and a popular plugin for it is one which allows users to pull a [Christmas Cracker]() with the bot. Doing so results in either you or the bot winning the prize from the cracker, which is picked from a list of random objects the bot knows. It also tracks how many hats each user and the bot has (i.e. how many times each has won). Out of scope for this implementation is the way that bMotion tracks items it likes and dislikes, and the cracker logic responds differently to the objects "in" the cracker and who wins.

The code for bMotion's cracker handler is [in this plugin](https://github.com/jamesoff/bmotion/blob/master/plugins/en/action_complex_cracker.tcl) and even if you're unfamiliar with TCL (a state I recommend) it is fairly easy to follow. Less than half of the file is logic and the rest of it is the content the plugin uses to generate output.

Ultimately the flow of execution for pulling a cracker is:

1. Pick a sound effect for the cracker to make
1. Pick who wins, either the bot/Alexa or the user
1. Pick a prize
1. Increment the hats counter for the bot/Alexa or the user
1. Maybe tell the user about the hat count

The other executions we want to handle are being asked how many hats the user or the bot/Alexa is wearing.

## How Alexa skills work

Alexa skills are triggered by *utterances*, which are phrases the user says. Those map to *intents*, which are the discrete things your skill can do. Not included in this skill are *slots*, which are terms in the utterance that are effectively parameters for your skill, such as the number of minutes a timer is being set for.

Typically your skill is handled by a Lambda function, which receives a request object which contains information including the intent which should execute, the values which went in the slots, and a user id (which represents the account associated with the Echo device).

The function should return a response object, which among other things should contain the text Alexa should speak back to the user and if it should listen for further utterances or not. It can also include data which shows as a card in the Alexa app.

## Creating the framework

To create a skill, you need a Lambda function which knows how to handle and respond to the requests, a list of intents and their slots (and the data type for each slot, to help Alexa understand how it should transcribe what it hears), and a list of example utterances which map to intents. The utterance training data is a list of ways the user could phrase invocation of the intent, and the Alexa service can extrapolate more ways to express queries than you list so it does not need to be exhaustive, but it should be fairly complete.

Here's the intent JSON for the cracker skill, which omits the standard Amazon intents for cancelling etc:

{% highlight json %}
{
  "intents": [
    {
      "intent": "PullCracker",
      "slots": []
    },
    {
      "intent": "CountHats",
      "slots": []
    },
    {
      "intent": "AlexaHats",
      "slots": []
    }
  ]
}
{% endhighlight %}

The sample utterances for the cracker skill are:

```
PullCracker pull a cracker
CountHats how many hats am i wearing
CountHats how many hats do i have on
CountHats how many hats have i won
AlexaHats how many hats are you wearing
AlexaHats how many hats do you have on
AlexaHats how many hats have you won
```

You can see that the training data gives the name of the intent, followed by an example utterance which should trigger it.

Finally we "just" need to write the functions which handle the intents. I prefer Python, and there's a nice library called [ask-alexa-pykit](https://github.com/anjishnu/ask-alexa-pykit) which helps handle the standard parts of interacting with Alexa.

## Writing the code

First, in a new project directory, we pull in ask-alexa-pykit.

```
% mkdir alexa-cracker
% pip install ask-alexa-pykit --target alexa-cracker
```

The ask-alexa-pykit README describes how to use it to create intents and utterance training data, although we're not going to use that. The intent data (minus the standard cancel, stop, and help intents) is shown above, as are the utterances. We don't need to supply these files with the function code, but I keep them in the repo anyway as a reference. I copy/paste them into the skill configuration page later.

Now we create the code lambda will load and run, which will be in lambda_function.py (although it can be called anything).

Here's the structure of the code to get things started.

{% highlight python %}
from ask import alexa


def lambda_handler(request_obj, context=None):
    metadata = {}

    return alexa.route_request(request_obj, metadata)


@alexa.default_handler()
def default(request):
    return alexa.create_response("You can ask me how many hats either of us is wearing, or to pull a cracker.")


@alexa.intent_handler("PullCracker")
def pull_cracker_handler(request):
    pass


@alexa.intent_handler("CountHats")
def count_hats_handler(request):
    pass


@alexa.intent_handler("AlexaHats")
def alexa_hats_handler(request):
	pass
{% endhighlight %}

`lambda_handler` is the function Lambda will be configured to execute. It uses a function from ask-alexa-pykit which will inspect the request and call the correct function for us. The functions to handle the intents are decorated with `@alexa.intent_handler()` and the intent name. The function name does not have to have any relation to the intent name. It should accept a single parameter, which is the request object. This can be examined to find out information including the unique user id for the account the request came from. We'll use this to track hat counts.

There's also a function decorated as `default_handler`, which is the one used when the skill is "opened" without an intent ("Alexa, open SKILLNAME"). Here you can see it uses another helper function from the library which creates the response for Alexa to read.

We're going to use DynamoDB to store hat counts, so let's `import boto3` and then at the end of the file, create the client/table objects. By creating these outside of the handler functions, they persist for the lifetime of the Lambda container, saving the overhead of recreating them every time the handler is called. The name of the table we use will come from an environment variable, so that it can be changed in the Lambda function configuration.

{% highlight python %}
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['BMOTION_TABLE'])
{% endhighlight %}

Let's write the functions to get and increment the number of hats for a user.

{% highlight python %}
def increment_hats(userid):
    hat_info = table.update_item(
        Key={"userid": str(userid)},
        AttributeUpdates={
            "hats": {
                "Action": "ADD",
                "Value": 1
            }
        },
        ReturnValues="ALL_NEW"
    )
    return hat_info['Attributes']['hats']


def get_hats(userid):
    try:
        hat_info = table.get_item(
            Key={"userid": str(userid)}
        )
        hats = hat_info['Item']['hats']
    except:
        hats = 0
    return int(hats)
{% endhighlight %}

Let's examine the `get_hats` function as it's the most straightforward. We try to read an item out of our `table` (as initialised using the code above), using the `userid` passed to the function as the search value. On finding the matching item, we read the `hats` property from it. If the item doesn't exist, or it doesn't have that property, the exception handler will set the hat count to zero. Then, we return the value.

For incrementing the hat count (when the user or Alexa wins), we could read the value, increment it, and store it. In a larger system, with more concurrent access, this would leave us open to a race condition, where two copies of our function could execute at the exact same time. Both would read the current value, increment it to the same new value, and both write that back. The result would be the value would have increased by one when it should have increased by two.

Because we care about Doing Things Right, we can use an atomic operation in DynamoDB, which lets us tell it to increment the value in such a way that another client doing so at the same time would have to wait until we'd written the new value, and then they would read that, increment it and write their new value.

To do this, we use the `update_item` method on the table, passing the same Key structure to locate the item we're interested in, and telling DynamoDB what update operation (`ADD`) we want to perform. We also ask it to return the new value of the item us so we can use it immediately, without having to `get_item` it immediately to find out what the value is. If the item doesn't exist (i.e. this is the first time this user has won), DynamoDB treats the missing value as 0, and increments it to 1.
