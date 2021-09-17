<?php
	if(isset($_POST['txt_awb'])){
		//print_r($_POST);
		$link = false;
		switch($_POST['txt_inicoi']){
			//Caso LAN:
			case '145':
			    $link = "https://secure.lancargo.com/etracking-web/publico/detalleGuia.do?lang=EN&prefix=145&number=".urlencode($_POST['txt_awb'])."&style=LA";
				break;
		    //Caso TAMPA:	
			case '729':
				$link = "http://skychain.tacacargo.com:8110/skychain/app?PID=WEB01-10&doc_typ=AWB&awb_pre=729&awb_no=".urlencode($_POST['txt_awb']);
				break;
			//Caso TACA:	
			case '530':
				$link = "http://skychain.tacacargo.com:8110/skychain/app?PID=WEB01-10&doc_typ=AWB&awb_pre=530&awb_no=".urlencode($_POST['txt_awb']);
				break;
			//Caso LUFTHANSA:
			case '020':
			    $link = "http://www.lhcargo.com/trackit/awb.trackit?prefix=020&awb=".urlencode($_POST['txt_awb'])."&referrer=myCargo&name=Search";
				break;
			//Caso EMIRATES:
			case '176':	
				$link = "http://skychain.emirates.com/skychain/app?PID=WEB01-10&doc_typ=AWB&awb_pre=176&awb_no=".urlencode($_POST['txt_awb']);
				break;
			//Caso COPA:
			case '230':
				$link = "http://eservices.copaair.com/webtrackingcyc/default.aspx?g1=230-".urlencode($_POST['txt_awb']);
				break;
			//Caso COPA:
			case '001':
				$form = "id='awbTrackingForm' action='https://www.aacargo.com/AACargo/tracking' method='POST'";
				$input1 = "id='airwayBills0.awbCode' name='airwayBills[0].awbCode' class='input1 inputTrack10Code' type='text' value='001' maxlength='3'";
				$input2 = "id='airwayBills0.awbNumber' name='airwayBills[0].awbNumber' class='input2 inputTrack10Number' type='text' value='54654612' maxlength='8'";
				$submit = "type='submit' name='track10Search' class='btn' value='Track' onclick='return validateawbFields();'/";
				break;
			default:
		}
		
		if($link != false){
			Header('Location:'.$link);
			exit();
		}
	}
?>


<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<LINK href="CSS/main.css" rel="stylesheet" type="text/css">
</head>
<script type="text/javascript" src="js/jquery.js"></script>

<script type="text/javascript">
 $(document).ready(function() {
   $("#companias_aereas").mouseup(function(){
	 $("#cod_incoi").val($(this).val());
   });
 });

</script>

<body bgcolor="" leftmargin="0" topmargin="0">

<form name='form1' method='post' target='_blank' action='index.php'>
  <table width="44%" border="0" cellspacing="0" cellpadding="0">
    <tr> 
      <td colspan="4"><img src="titulo.png" width="595" height="216"></td>
    </tr>
    <tr> 
      <td width="14%" height="19">&nbsp;</td>
      <td colspan="2">&nbsp;</td>
      <td width="29%">&nbsp;</td>
    </tr>
    <tr> 
      <td height="21">&nbsp;</td>
      <td width="32%" bgcolor="#FFFFFF"><font color="#FFFFFF" size="2" face="Verdana, Arial, Helvetica, sans-serif" class="letras">Seleccionar 
        Compañía:&nbsp;</font></td>
      <td width="25%" bgcolor="#FFFFFF"><div id="header">
<ul class="nav">
<li><a href="">EMIRATES</a>
<ul>
<li><a href="">LATAM</a></li>
<li><a href="">LUFTHANSA</a></li>
<li><a href="">TACA</a></li>
<li><a href="">TAMPA</a></li>
<li><a href="america.php" target="iframe">AMERICA</a></li>
</ul>
</li>
</div></td>
      <td>&nbsp;</td>
    </tr>
  </table>  
   <iframe name="iframe" src="central.php" width="650" height="200" frameborder="0"></iframe>
  
</form>
</body></html>

