<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
		<style type="text/css">
			.letras {
				color: #1B3B6A;
			}
		</style>
		
		<base target="_blank">
		<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
		<title></title>
		<link href='http://fonts.googleapis.com/css?family=Arimo' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="css/blueprint-afkl/input10_layout.css" type="text/css"></link>
		<link rel="shortcut icon" href="favicon.ico"></link>
		<script type="text/javascript">
		<!--

		var AWB_DEFAULT_TXT="";

		function checkAwb(pre, awb){

			if (pre!="" 
				&& awb!="" 
				&& awb!=AWB_DEFAULT_TXT){
				
				if(isNaN(awb)==false && awb.length==8){
					awb1=awb.substring(0,7);
					awb2=awb.substring(7);
					if ((awb1 % 7)==awb2){
						return true;
					}
				}
			}
			return false;
		}


		function send(){
		txt="";
		awb_err="";
		var myTarget="t_"+Math.floor(Math.random()*999999);

			for (var i=1; i <= 1; i++)
			{
				t_pre=document.form1.elements["pre"+i][document.form1.elements["pre"+i].selectedIndex].value;
				t_awb=document.form1.elements["awb"+i].value;
					
				if (checkAwb(t_pre,t_awb)){
				txt+="<input type='hidden' name='awbnumber' value='";
					txt+=document.form1.elements["pre"+i][document.form1.elements["pre"+i].selectedIndex].value;
					txt+="-";
					txt+=document.form1.elements["awb"+i].value;
					txt+="' />";
				} else if(t_awb!=AWB_DEFAULT_TXT){
					awb_err+=(awb_err=="" ? "'" : ", '")+t_pre+"-"+t_awb+"'";
				}
			}
			
			if (awb_err=="" && txt!=""){
				txt+="<input type='hidden' name='requester' value='AFKLMP' />";
				txt='<form name="submitform" id="submitform" action="http://afklcargo-etracking1.traxon.com/ttwfe/search.do" method="post">'+txt+'</form>';
				document.getElementById("submitDiv").innerHTML=txt
				w=1020
				h=550
				wd=  window.open('',myTarget,'width='+w+',height='+h+',top=0,left=0,menubar=no,location=no,toolbar=no,status=no,resizable=yes,scrollbars=yes');
				document.submitform.target = myTarget;
				document.submitform.submit();
			} else if(awb_err!=""){
				alert("AWB "+awb_err+" invalid.");
			}
		}
		function rs(obj){
			if (obj.type=="text")
				if (obj.value==AWB_DEFAULT_TXT)
					obj.value="";
				else if (obj.value=="")
					obj.value=AWB_DEFAULT_TXT;
				else if (isNaN (obj.value))
					obj.value=AWB_DEFAULT_TXT;
		}

		// -->
		</script>
		
		
	</head>

	<body bgcolor="" leftmargin="0" topmargin="0">
		<form name="form1" action="" method="post" onSubmit="return false;">
		  <table width="645" border="0" cellspacing="0" cellpadding="0">


			<tr> 
			  <td width="115" height="19">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
			  <td colspan="3" bgcolor="#FFFFFF">&nbsp;</td>
			  <td width="162">&nbsp;</td>
			</tr>
			<tr> 
					  <td bgcolor="#FFFFFF">&nbsp;</td>
					  <td width="125" bgcolor="#FFFFFF"><font color="#FFFFFF" size="2" face="Verdana, Arial, Helvetica, sans-serif" class="letras">Compa&ntilde;&iacute;a </font></td>
					  <td width="164" bgcolor="#FFFFFF">&nbsp;</td>
					  <td width="79" bgcolor="#FFFFFF"><font color="#FFFFFF" size="2" face="Verdana, Arial, Helvetica, sans-serif" class="letras">AIR FRANCE</font></td>
					  <td bgcolor="#FFFFFF">&nbsp;</td>
			</tr>
			<tr>
					<td>&nbsp;</td>
					</tr>
			<tr> 
			  <td height="19">&nbsp;</td>
			  <td height="22" bgcolor="#FFFFFF"><font color="#FFFFFF" size="2" face="Verdana, Arial, Helvetica, sans-serif" class="letras">Prefijo:</font></td>
			  <td height="22" valign="middle" bgcolor="#FFFFFF"><font color="#FFFFFF" size="2" face="Verdana, Arial, Helvetica, sans-serif" class="letras">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
				</font></td>
			  <td height="22" bgcolor="#FFFFFF"> 
				<p>
				  <select name="pre1">
				    <option value="">prefix</option>
				    <option value="057">057</option>
				    <option value="074">074</option>
			      </select>
			  </p></td>
			  <td rowspan="5" align="right" valign="bottom"><img src="c-3.png" width="162" height="68"></td>
			</tr>
			<tr> 
			  <td height="19">&nbsp;</td>
			  <td colspan="3" bgcolor="#FFFFFF">&nbsp;</td>
			</tr>
			<tr> 
			  <td height="19">&nbsp;</td>
			  <td bgcolor="#FFFFFF"><font color="#FFFFFF" size="2" face="Verdana, Arial, Helvetica, sans-serif" class="letras">Ingresar&nbsp;Nro.AWB:</font></td>
			  <td bgcolor="#FFFFFF">&nbsp;</td>
			  <td bgcolor="#FFFFFF"><input name="awb1" value="" maxlength="8" size="6" onFocus="rs(this);" onBlur="rs(this);"/></td>
			</tr>
			<tr> 
			  <td height="19">&nbsp;</td>
			  <td colspan="3" bgcolor="#FFFFFF">&nbsp;</td>
			</tr>
			<tr> 
			  <td height="29">&nbsp;</td>
			  <td bgcolor="#FFFFFF">&nbsp;</td>
			  <td bgcolor="#FFFFFF">&nbsp;</td>
			  <td bgcolor="#FFFFFF"><input type="submit" value="Buscar" onClick="send()"></td>
			</tr>
		  </table>  <p>&nbsp; </p>
		  
		</form>
		<div id="submitDiv"></div>
	</body>
</html>