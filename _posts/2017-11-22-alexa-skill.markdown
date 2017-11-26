---
layout: post
title: Creating a simple Alexa skill
summary: How I created the bMotion cracker-pulling skill for Alexa
---

*TODO*
* Prerequisites
* Create DynamoDB table
* Create role(s)
* Create skill in UI
* Tidy up python snippets
* Bonus round: sfx in S3

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

The sample utterances (the list of example phrases to trigger an intent) for the cracker skill are:

```
PullCracker pull a cracker
CountHats how many hats am i wearing
CountHats how many hats do i have on
CountHats how many hats have i won
AlexaHats how many hats are you wearing
AlexaHats how many hats do you have on
AlexaHats how many hats have you won
```

You can see that the training data gives the name of the intent, followed by an example utterance which should trigger it. (The names of the intents are something you decide.)

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

We'll look at the content for the other request handlers shortly.

### Counting hats

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

### Handling a request

So how do we handle a request? When the user asks your skill for something, which matches one of the utterances (and so an intent), Alexa sends your code a request. The request data includes the intent the user triggered, and if we had any, the values which go in the slots (e.g. the length of time a timer should run for).

The library we're using to write this function looks at the request object for you (`alexa.route_request()`) and calls the request handler function (which it knows because of the `@alexa.intent_handler()` decoration).

Here's what the code for counting the user's hats looks like (although not exactly; my real one contains logic for using different responses and so on):

{% highlight python %}
@alexa.intent_handler("CountHats")
def count_hats_handler(request):
    hats = get_hats(request.user_id())
    if hats == 0:
        retval = "You have no hats."
    elif hats == 1:
        retval = "You have one hat."
    else:
		retval = "You are wearing {} hats".format(hats)
    return alexa.create_response(retval, end_session=True)
{% endhighlight %}

First, we call our `get_hats()` function to read the number of hats this user has from DynamoDB. Then we just select the right output based on that number, and finally send the output back to Alexa. For this response, we're setting `end_session` to `True`, which tells Alexa we're done with this interaction. The practical result of this is that on the user's device, the light ring goes out and Alexa stops listening for more utterances.

If we didn't set this, the light would stay on, and Alexa would be waiting for more input (to our skill). This more more for when you need to ask the user for more information to clarify something (e.g. "Alexa, set a timer" "For how many minutes?"). Session management is beyond the scope of this guide.

### Pulling a cracker

Here's an example function for pulling a cracker, which goes through the steps outlined above. Again, my actual code is more involved mostly to give greater variety of content.

{% highlight python %}
@alexa.intent_handler("PullCracker")
def pull_cracker_handler(request):
    prizes = ['mood fish', 'plastic frog', 'magnifying glass']
    retval = "<say-as interpret-as=\"interjection\">{}</say-as>".format(random.choice(['boom', 'pop', 'snap']))
    retval = retval + '<break time="0.5s" />'
    winner = random.choice(['alexa', 'user'])
    if winner == 'user':
        retval = retval + "You won, and you got a {}!".format(random.choice(prizes))
        hats = increment_hats(request.user_id())
        if hats > 1:
            retval = retval + " You're now wearing {} hats.".format(hats)
    else:
        retval = retval + "I won, and I got a {}".format(random.choice(prizes))
        increment_hats(request.user_id() + ":alexa")
        if hats > 1:
            retval = retval + " I'm now wearing {} hats.".format(hats)
    retval = "<speak>{}</speak>".format(retval)
    return alexa.create_response(
        message=retval,
        end_session=True,
        is_ssml=True
    )
{% endhighlight %}

This function builds the output for Alexa a bit at a time. The first bit picks a sound effect for the cracker. It uses SSML, which lets us control how Alexa speaks the text a bit more. The sound of the cracker is marked up as in interjection.

Next we add a short pause, which Alexa locates the bits of cracker and prize which fell on the floor.

We pick a winner at random, and then tell the user they won or that we did, and the prize. The hat count is incremented using the code we wrote earlier, and we add output telling the user the new number of hats.

Finally we need to wrap the whole output in `<ssml>` tags, and then we return it to Alexa.

## Uploading to Lambda

Now we need to upload our code to Lambda so that it can executed by Alexa. Sign in to the AWS Console and head over to Lambda. Click the **Create Function** button, then **Author from scratch**. Name the function something like `alexa-cracker`. Select to Create a new role.

TODO

Click **Create Function**, and you should end up at the function Configuration page, which shows among other things the function code. We can't just paste in the Python here, as we're using the ask-alexa-pybot library. Instead, we'll need to upload a Zip file of the code and library.

In your terminal, in the `alexa-cracker` directory, create a zip file:

```
% zip -r ask-lambda.zip *
```

In the console, from the **Code entry type** dropdown choose "Upload a .ZIP file", then click the **Upload** button and choose the Zip file just created. Change the **Runtime** to Python (to match your targeted version), then click the **Save** button (at the top of the page). When the page reloads, your code should be visible in the editor.

Now we need to make Lambda aware that Alexa is going to trigger this function. Select **Triggers** under the title of your function, click **+ Add Trigger**. On the pop-up, click the dashed box and select **Alexa Skills Kit**, then **Submit**.

## Configuring the Skill

Sign in to the [Amazon Developer Portal](https://developer.amazon.com) and then head over to the [Alexa Skills Kit](https://developer.amazon.com/edw/home.html#/skills) section. Click **Add a New Skill**.

Leave Skill Type as Custom Interaction Model, select the correct language, and enter a name and an invocation name. Leave the Global Fields all at No. Click **Save** and then (once it shows up), **Next**.

Copy your intent schema file contents and paste it into the box. Skip the Custom Slot Types section. Copy your utterance file and paste it into the Sample Utterances box. Click **Next** and wait a few seconds while Amazon does some processing.


