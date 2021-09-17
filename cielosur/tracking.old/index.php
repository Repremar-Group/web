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
			default:
		}
		
		if($link != false){
			Header('Location:'.$link);
			exit();
		}
	}
?>


<html><head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<style type="text/css">
.letras {
	color: #1B3B6A;
}
</style>
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
<form name='form1' method='post' target="_blank" action="index.php">
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
      <td width="25%" bgcolor="#FFFFFF"><select name="companias_aereas" id="companias_aereas">
		  <option value="176">EMIRATES</option>
          <option value="145">LATAM</option>
          <option value="020">LUFTHANSA</option>
          <option value="530">TACA</option>
          <option value="729">TAMPA</option>
        </select></td>
      <td>&nbsp;</td>
    </tr>
    <tr> 
      <td height="19">&nbsp;</td>
      <td colspan="2" bgcolor="#FFFFFF">&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr> 
      <td height="19">&nbsp;</td>
      <td bgcolor="#FFFFFF"><font color="#FFFFFF" size="2" face="Verdana, Arial, Helvetica, sans-serif" class="letras">Prefijo: 
        </font></td>
      <td bgcolor="#FFFFFF"> <input name="txt_inicoi" type="text" id="cod_incoi" value="176" size="1" maxlength="3" readonly="readonly"> 
      </td>
      <td rowspan="5" align="right" valign="bottom"><img src="c-3.png" width="162" height="68"></td>
    </tr>
    <tr> 
      <td height="19">&nbsp;</td>
      <td colspan="2" bgcolor="#FFFFFF">&nbsp;</td>
    </tr>
    <tr> 
      <td height="19">&nbsp;</td>
      <td bgcolor="#FFFFFF"><font color="#FFFFFF" size="2" face="Verdana, Arial, Helvetica, sans-serif" class="letras">Ingresar 
        Nro.AWB:</font></td>
      <td bgcolor="#FFFFFF"><input name="txt_awb" type="text" size="6" maxlength="8" id="txt_awb"></td>
    </tr>
    <tr> 
      <td height="19">&nbsp;</td>
      <td colspan="2" bgcolor="#FFFFFF">&nbsp;</td>
    </tr>
    <tr> 
      <td height="29">&nbsp;</td>
      <td bgcolor="#FFFFFF">&nbsp;</td>
      <td bgcolor="#FFFFFF"><input type="submit" name="btn_buscar" value="Buscar" id="btn_buscar2"></td>
    </tr>
  </table>  <p>&nbsp; </p>
</form>
</body></html>

