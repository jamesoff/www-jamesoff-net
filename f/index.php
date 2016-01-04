<?php
    include_once "../include/_database.phtml";
    if (!isset($nocount) && databaseConnect()) {
        $result = @mysql_query("SELECT hits FROM fail_hits");
        $hits = mysql_result($result,0,"hits");
        $hits++;
        $hits_string = "You are the $hits";
        $bling = (string)$hits;
        $endChar = $bling{strlen($bling)-1};
        switch ($endChar) {
            case "1": $append .= "st"; break;
            case "2": $append .= "nd"; break;
            case "3": $append .= "rd"; break;
            default:
                $append .= "th";
        }

        $endChars = substr($bling, strlen($bling)-2);
        switch ($endChars) {
        case "11": case "12": case "13": $append = "th"; break;
        }

        $hits_string .= "$append stupid person to be directed to this page.";

        @mysql_query("UPDATE fail_hits SET hits='$hits'");

    }
    else {
        $hits_string = "";
    }

    $taunts = array(
        "FAIL",
        "TAUNT",
        "CRETIN"
    );

    $taunt = $taunts[rand(0,sizeof($taunts)-1)];

    $fontsize = 150;
    if (strlen($taunt) > 6) {
        $fontsize = 120;
    }
?>

<html>
<head>
  <title><?php echo $taunt; ?></title>
</head>

<body bgcolor=#000>
<table width="100%" height="100%">
<tr><td align="center" valign="middle">
<span style="font-size:<?php echo $fontsize; ?>pt; font-family: Arial; font-weight: bold; color: white;">
<?php echo $taunt; ?></span>
<br /><br />
<span style="font-size: 8pt; font-family: Verdana, Tahoma, Arial; color: #444444;"><?php echo $hits_string; ?><br />
Please get it in gear at your earliest convenience.</span>
</td></tr>
</table>
</body>
</html>
