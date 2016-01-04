<html>
<head>
  <title>taunt</title>
</head>

<body bgcolor=#000>
<table width="100%" height="100%">
<tr><td align="center" valign="middle">
<span style="font-size:150pt; font-family: Arial; font-weight: bold; color: white;">
TAUNT</span>
<br /><br />
<div id="failcount">&nbsp;</div>>
Please get it in gear at your earliest convenience.
</td></tr>
</table>
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript">// <![CDATA[

    function fetchFails() {
        var api_url = "https://idz7b48rc7.execute-api.eu-west-1.amazonaws.com/prod/fails";
        $.getJSON(api_url, function(data) {
            if (data.ok) {
                $("div#failcount") = "You are the " + data.n + "th person to be directed to this page.";
            }
        );
    }

//]]</script>
</body>
</html>
