<?php
	if (!isset($_GET['comp'])) 
	{
		$compa = "EMIRATES";
	}
	else
	{
		$compa = $_GET['comp'];
	}
	switch($compa){
			//Caso EMIRATES:
			case 'EMIRATES':
				$form = "<form name='form1' method='post' target='_blank' action='tracking_aereo/procesa.php'>";
				$prefijo = "<input class='prefix' name='txt_inicoi' type='text' id='cod_incoi' value='176' size='1' maxlength='3' readonly='readonly'>";
				$inputAwb = "<input class='campo_texto' name='txt_awb' type='text' size='6' maxlength='8' id='txt_awb'>";
				$inputSubmit = "<input class='buscar' type='submit' name='btn_buscar' value='SEARCH' id='btn_buscar2'>";
				break;
			
			//Caso LATAM:	
			case 'LATAM':
				$form = "<form name='form1' method='post' target='_blank' action='tracking_aereo/procesa.php'>";
				$prefijo = "<input class='prefix' name='txt_inicoi' type='text' id='cod_incoi' value='145' size='1' maxlength='3' readonly='readonly'>";
				$inputAwb = "<input class='campo_texto' name='txt_awb' type='text' size='6' maxlength='8' id='txt_awb'>";
				$inputSubmit = "<input class='buscar' type='submit' name='btn_buscar' value='SEARCH' id='btn_buscar2'>";
				break;
			
			//Caso LUFTHANSA:	
			case 'LUFTHANSA':
				$form = "<form name='form1' method='post' target='_blank' action='tracking_aereo/procesa.php'>";
				$prefijo = "<input class='prefix' name='txt_inicoi' type='text' id='cod_incoi' value='020' size='1' maxlength='3' readonly='readonly'>";
				$inputAwb = "<input class='campo_texto' name='txt_awb' type='text' size='6' maxlength='8' id='txt_awb'>";
				$inputSubmit = "<input class='buscar' type='submit' name='btn_buscar' value='SEARCH' id='btn_buscar2'>";
				break;
		
			//Caso AMERICAN:	
			case 'AMERICAN':
				$form = "<form id='awbTrackingForm' action='https://www.aacargo.com/AACargo/tracking' method='POST' target='_blank'>";
				$prefijo = "<input class='prefix' id='airwayBills0.awbCode' name='airwayBills[0].awbCode' class='input1 inputTrack10Code' type='text' value='001' maxlength='3' size='1' readonly='readonly'/>";
				$inputAwb = "<input class='campo_texto' id='airwayBills0.awbNumber' name='airwayBills[0].awbNumber' class='input2 inputTrack10Number' type='text' value='' maxlength='8' size='6'/>";
				$inputSubmit = "<input class='buscar' type='submit' name='track10Search' class='btn' value='SEARCH' onClick='return validateawbFields();'/>";
				break;
				
			//Caso COPA:	
			case 'COPA':
				$form = "<form name='frmHomePage' method='post' action='http://www.copacargo.com/homepage.aspx?lang=es' id='frmHomePage' target='_blank'>";
				$prefijo = "<input class='prefix' type='text' value='230' maxlength='3' size='1' readonly='readonly'/>";
				$inputAwb = "<input class='campo_texto' name='uc:txtGuia' id='uc_txtGuia' value='' maxlength='8' size='6'>";
				$inputSubmit = "<input class='buscar' type='submit' name='uc:btnSearch' value='SEARCH' id='uc_btnSearch' class='inputsubmit1' />";
				$inputshidden = "<input type='hidden' name='__EVENTTARGET' id='__EVENTTARGET' value='' />
								<input type='hidden' name='__EVENTARGUMENT' id='__EVENTARGUMENT' value='' />
								<input type='hidden' name='__VIEWSTATE' id='__VIEWSTATE' value='/wEPDwUKMTU3NTA5MjEyOQ9kFgICAw9kFhICAQ9kFhJmDw8WBB4LUG9zdEJhY2tVcmwFLmh0dHA6Ly93d3cuY29wYWNhcmdvLmNvbS9ob21lcGFnZS5hc3B4P2xhbmc9ZXMeCEltYWdlVXJsBR5+L2ltYWdlcy9CYW5uZXJzSG9tZS9jYXJnby5qcGdkZAIBDw8WBh4EVGV4dAUIRXNwYcOxb2weC05hdmlnYXRlVXJsBRYvaG9tZXBhZ2UuYXNweD9sYW5nPWVzHgdWaXNpYmxlaGRkAgIPDxYGHwIFB0VuZ2xpc2gfAwUWL2hvbWVwYWdlLmFzcHg/bGFuZz1lbh8EZ2RkAgMPDxYEHwIFClBvcnR1Z3XDqXMfAwUWL2hvbWVwYWdlLmFzcHg/bGFuZz1wdGRkAgQPDxYEHwMFF34vaG9tZVBhZ2UuYXNweD9sYW5nPWVzHwIFB0luaWNpbyBkZAIFDw8WBB8CBRVBY2VyY2EgZGUgQ29wYSBDYXJnbyAfAwUqfi9odG1sL3VzZXIvZGVmYXVsdC5hc3B4P1BhZ2VJZD00NiZsYW5nPWVzZGQCBg8PFgQfAgUNQ29udMOhY3Rlbm9zIB8DBSx+L1NlcnZpY2lvQWxDbGllbnRlL2NvbnRhY3Rlbm9zLmFzcHg/bGFuZz1lc2RkAgcPPCsADQIADxYCHgtfIURhdGFCb3VuZGdkDBQrAAcFFzA6MCwwOjEsMDoyLDA6MywwOjQsMDo1FCsAAhYOHwIFCVByb2R1Y3Rvcx4FVmFsdWUFCVByb2R1Y3Rvcx8DBSgvaHRtbC91c2VyL2RlZmF1bHQuYXNweD9QYWdlSWQ9MSZsYW5nPWVzHgdFbmFibGVkZx4KU2VsZWN0YWJsZWceCERhdGFQYXRoBSgvaHRtbC91c2VyL2RlZmF1bHQuYXNweD9wYWdlaWQ9MSZsYW5nPWVzHglEYXRhQm91bmRnZBQrAAIWDh8CBQxDb3RpemFjaW9uZXMfBgUMQ290aXphY2lvbmVzHwMFDC9RdW90ZXMuYXNweB8HZx8IZx8JBQwvcXVvdGVzLmFzcHgfCmdkFCsAAhYOHwIFDVJlc2VydmFjaW9uZXMfBgUNUmVzZXJ2YWNpb25lcx8DBRIvUmVzZXJ2YXRpb25zLmFzcHgfB2cfCGcfCQUSL3Jlc2VydmF0aW9ucy5hc3B4HwpnZBQrAAIWDB8CBRNTZXJ2aWNpbyBhbCBDbGllbnRlHwYFE1NlcnZpY2lvIGFsIENsaWVudGUfB2cfCGgfCQUkZmJlYjgzODktZGJkNS00ZWI1LWJmNmItNjdhMjgwN2Q3YTFiHwpnFCsAAwUHMDowLDA6MRQrAAIWDh8CBQxDb250w6FjdGVub3MfBgUMQ29udMOhY3Rlbm9zHwMFKy9TZXJ2aWNpb0FsQ2xpZW50ZS9jb250YWN0ZW5vcy5hc3B4P2xhbmc9ZXMfB2cfCGcfCQUrL3NlcnZpY2lvYWxjbGllbnRlL2NvbnRhY3Rlbm9zLmFzcHg/bGFuZz1lcx8KZ2QUKwACFg4fAgUIT2ZpY2luYXMfBgUIT2ZpY2luYXMfAwUoL2h0bWwvdXNlci9kZWZhdWx0LmFzcHg/UGFnZUlkPTUmbGFuZz1lcx8HZx8IZx8JBSgvaHRtbC91c2VyL2RlZmF1bHQuYXNweD9wYWdlaWQ9NSZsYW5nPWVzHwpnZBQrAAIWDB8CBQhOb3NvdHJvcx8GBQhOb3NvdHJvcx8HZx8IaB8JBSRmOTM2OTY1Yi00ZGQ0LTQ3MDAtYjY4Yi01OGVlMTg0OWJhMzkfCmcUKwAFBQ8wOjAsMDoxLDA6MiwwOjMUKwACFg4fAgUISGlzdG9yaWEfBgUISGlzdG9yaWEfAwUoL2h0bWwvdXNlci9kZWZhdWx0LmFzcHg/UGFnZUlkPTImbGFuZz1lcx8HZx8IZx8JBSgvaHRtbC91c2VyL2RlZmF1bHQuYXNweD9wYWdlaWQ9MiZsYW5nPWVzHwpnZBQrAAIWDh8CBQVGbG90YR8GBQVGbG90YR8DBSgvaHRtbC91c2VyL2RlZmF1bHQuYXNweD9QYWdlSWQ9MyZsYW5nPWVzHwdnHwhnHwkFKC9odG1sL3VzZXIvZGVmYXVsdC5hc3B4P3BhZ2VpZD0zJmxhbmc9ZXMfCmdkFCsAAhYOHwIFCEFjdWVyZG9zHwYFCEFjdWVyZG9zHwMFKC9odG1sL3VzZXIvZGVmYXVsdC5hc3B4P1BhZ2VJZD00Jmxhbmc9ZXMfB2cfCGcfCQUoL2h0bWwvdXNlci9kZWZhdWx0LmFzcHg/cGFnZWlkPTQmbGFuZz1lcx8KZ2QUKwACFg4fAgUNUHVibGljYWNpb25lcx8GBQ1QdWJsaWNhY2lvbmVzHwMFKS9odG1sL3VzZXIvZGVmYXVsdC5hc3B4P1BhZ2VJZD0xNSZsYW5nPWVzHwdnHwhnHwkFKS9odG1sL3VzZXIvZGVmYXVsdC5hc3B4P3BhZ2VpZD0xNSZsYW5nPWVzHwpnZBQrAAIWDh8CBQ5DYXJnbyBDb2xvbWJpYR8GBQ5DYXJnbyBDb2xvbWJpYR8DBZcBamF2YXNjcmlwdDp2YXIgdz13aW5kb3cub3BlbignaHR0cDovL3d3dy5jb3BhYWlyLmNvbS9zaXRlcy9jYy9lcy9udWVzdHJvcy1wcm9kdWN0b3MvUGFnZXMvY2FyZ2EtY29ycmVvLWNvcGEtYWlybGluZXMtY29sb21iaWEuYXNweCcsJ0NvcGFBaXJsaW5lcycsJycpOx8HZx8IZx8JBZcBamF2YXNjcmlwdDp2YXIgdz13aW5kb3cub3BlbignaHR0cDovL3d3dy5jb3BhYWlyLmNvbS9zaXRlcy9jYy9lcy9udWVzdHJvcy1wcm9kdWN0b3MvcGFnZXMvY2FyZ2EtY29ycmVvLWNvcGEtYWlybGluZXMtY29sb21iaWEuYXNweCcsJ2NvcGFhaXJsaW5lcycsJycpOx8KZ2RkAggPFgIeD1NpdGVNYXBQcm92aWRlcgUKU2l0ZU1hcF9lc2QCBQ8PFgIfAQUtfi9pbWFnZXMvQmFubmVyc0hvbWUvaW1hZ2VuIGNlbnRyYWwgY2FyZ28uanBnZGQCBw8PFgQfAAUwaHR0cDovL3d3dy5jb3BhY291cmllci5jb20vaG9tZXBhZ2UuYXNweD9sYW5nPWVzHwEFKH4vaW1hZ2VzL0Jhbm5lcnNIb21lL2xvZ29jb3VyaWVyMjAxMi5qcGdkZAIJDw8WAh8CBQ5Db3BhIEFpcmxpbmVzIGRkAgsPDxYEHwAFO2h0dHA6Ly9hdXRoLmNvcGFhaXIuY29tL3NpdGVzL0NDL2VzL1BhZ2VzL3N0YXJhbGxpYW5jZS5hc3B4HwEFJ34vaW1hZ2VzL0Jhbm5lcnNIb21lL2xvZ28gY29wYSBzdGFyLmpwZ2RkAg0PDxYCHwIFCU5vdGljaWFzIGRkAg8PPCsACwEADxYIHghEYXRhS2V5cxYAHgtfIUl0ZW1Db3VudAICHglQYWdlQ291bnQCAR4VXyFEYXRhU291cmNlSXRlbUNvdW50AgJkFgJmD2QWBAIBD2QWAgIBD2QWAgIBDw8WBB8CBVVDb3BhIEFpcmxpbmVzIGN1bXBsZSA2NSBhw7FvcyBkZSBjcmVjaW1pZW50byBzb3N0ZW5pZG8sIGNvbiBlbCBIVUIgTGlkZXIgZW4gbGEgUmVnaW9uHwMFKm51ZXN0cmFlbXByZXNhL25vdGljaWFzL25vdGljaWEuYXNweD9JRD03MWRkAgIPZBYCAgEPZBYCAgEPDxYEHwIFYENPUEEgQUlSTElORVMgc2UgaW50ZWdyYSBhIFN0YXIgQWxsaWFuY2UsIGxhIHJlZCBnbG9iYWwgZGUgYWVyb2xpbmVhcyBtYXMgaW1wb3J0YW50ZXMgZGVsIG11bmRvLh8DBSpudWVzdHJhZW1wcmVzYS9ub3RpY2lhcy9ub3RpY2lhLmFzcHg/SUQ9NzBkZAIRD2QWAgIBDw8WAh8CBRhOb3RpY2lhcyBubyBEaXNwb25pYmxlcyBkZAITD2QWAgIBDzwrAA0CAA8WAh8FZ2QMFCsABAUPMjowLDA6MCwwOjEsMDoyFCsAAhYOHwIFCEhpc3RvcmlhHwYFCEhpc3RvcmlhHwMFIC9odG1sL3VzZXIvZGVmYXVsdC5hc3B4P1BhZ2VJZD0yHwdnHwhnHwkFIC9odG1sL3VzZXIvZGVmYXVsdC5hc3B4P3BhZ2VpZD0yHwpnZBQrAAIWDh8CBSVQb2xpdGljYXMgZGUgUHJpdmFjaWRhZCB5IENvbmRpY2lvbmVzHwYFJVBvbGl0aWNhcyBkZSBQcml2YWNpZGFkIHkgQ29uZGljaW9uZXMfAwUgL2h0bWwvdXNlci9kZWZhdWx0LmFzcHg/UGFnZUlkPTYfB2cfCGcfCQUgL2h0bWwvdXNlci9kZWZhdWx0LmFzcHg/cGFnZWlkPTYfCmdkFCsAAhYOHwIFCVNlcnZpY2lvcx8GBQlTZXJ2aWNpb3MfAwUgL2h0bWwvdXNlci9kZWZhdWx0LmFzcHg/UGFnZUlkPTcfB2cfCGcfCQUgL2h0bWwvdXNlci9kZWZhdWx0LmFzcHg/cGFnZWlkPTcfCmdkZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WBAUUV1VDTWVudTppYnRuTG9nb0NvcGEFCkltZ0NvcGFBaXIFDkltZ0NvcGFDb3VyaWVyBQtJbWdGb290ZXJDMhffY4zB1fWB9KFdIch2uonE3+Hn' />";
				break;
				
			//Caso IBERIA:	
			case 'IBERIA':
				$form = "<form name='frmTracking' action='https://www.iagcargo.com/iagcargo/portlet/es/html/601/main/search' method='post' target='_blank'>";
				$prefijo = "<input class='prefix' id='awb_cia' maxlength='3' size='1' name='awb.cia' value='075' class='track_cia' type='text'/>";
				$inputAwb = "<input class='campo_texto' id='awb_cod' maxlength='8' size='6' name='awb.cod' value='' class='track_cod' type='text'/>";
				$inputSubmit = "<input class='buscar' type='submit' value='SEARCH' name='BUSCAR' alt='Buscar' title='Buscar'  class='button'>";
				break;
			
			//Caso GOL:	
			case 'GOL':
				$form = "<FORM ACTION='http://g3cs.uesc.com/dsse2.asp' METHOD='post' NAME='dsse' TARGET='_blank' onSubmit='return Valdss(this);'>";
				$prefijo = "<input class='prefix' type='text' size='1' maxlength='3' name='inacn' value='127' readonly class='signin' tabIndex=8 title='Insira o Código ACN do AWB'>";
				$inputAwb = "<input class='campo_texto' type='text' size='6' maxlength='8' name='inref' value='' class='signin' tabIndex=9 title='Conhecimento Aéreo'>";
				$inputSubmit = "<input class='buscar' type='submit' value='SEARCH'/>";
				$inputshidden = "<DIV valign='top' id='mulTrack' style='display:none;'>
								<input type='text' size='3' maxlength='3' name='inacn' value='127' class='signin' tabIndex=10 title='Insira o Código ACN do AWB'>
			  					<input type='text' size='9' maxlength='9' name='inref' value='' class='signin' tabIndex=11 title='Conhecimento Aéreo'>
			  					<input type='text' size='3' maxlength='3' name='inacn' value='127' class='signin' tabIndex=12 title='Insira o Código ACN do AWB'>
			  					<input type='text' size='9' maxlength='9' name='inref' value='' class='signin' tabIndex=13 title='Conhecimento Aéreo'>
			  					<input type='text' size='3' maxlength='3' name='inacn' value='127' class='signin' tabIndex=14 title='Insira o Código ACN do AWB'>
			  					<input type='text' size='9' maxlength='9' name='inref' value='' class='signin' tabIndex=15 title='Conhecimento Aéreo'>
			  					<input type='text' size='3' maxlength='3' name='inacn' value='127' class='signin' tabIndex=16 title='Insira o Código ACN do AWB'>
			  					<input type='text' size='9' maxlength='9' name='inref' value='' class='signin' tabIndex=17 title='Conhecimento Aéreo'>
			  					<input type='text' size='3' maxlength='3' name='inacn' value='127' class='signin' tabIndex=18 title='Insira o Código ACN do AWB'>
			  					<input type='text' size='9' maxlength='9' name='inref' value='' class='signin' tabIndex=19 title='Conhecimento Aéreo'>
			  					<input type='text' size='3' maxlength='3' name='inacn' value='127' class='signin' tabIndex=20 title='Insira o Código ACN do AWB'>
			  					<input type='text' size='9' maxlength='9' name='inref' value='' class='signin' tabIndex=21 title='Conhecimento Aéreo'>
			  					<input type='text' size='3' maxlength='3' name='inacn' value='127' class='signin' tabIndex=22 title='Insira o Código ACN do AWB'>
			  					<input type='text' size='9' maxlength='9' name='inref' value='' class='signin' tabIndex=23 title='Conhecimento Aéreo'>
			  					<input type='text' size='3' maxlength='3' name='inacn' value='127' class='signin' tabIndex=24 title='Insira o Código ACN do AWB'>
			  					<input type='text' size='9' maxlength='9' name='inref' value='' class='signin' tabIndex=25 title='Conhecimento Aéreo'>
			  					<input type='text' size='3' maxlength='3' name='inacn' value='127' class='signin' tabIndex=26 title='Insira o Código ACN do AWB'>
			  					<input type='text' size='9' maxlength='9' name='inref' value='' class='signin' tabIndex=27 title='Conhecimento Aéreo'>
								</div>";
				$inputhidden1 = "<input accesskey=A type=hidden value=0 checked name=opt onClick='Change_input()'>";
				break;
								
			//Caso AEROLINEAS ARGENTIAS:	
			case 'ARG':
				$form = "<form action='http://cargo.aerolineas.com.ar/etracking/search' id='searchForm' method='post' target='_blank'>";
				$prefijo = "<input class='prefix' data-mask='' name='[0].prefix' type='text' value='044' maxlength='3' size='1' readonly='readonly'/>";
				$inputAwb = "<input class='campo_texto' data-mask='' name='[0].awb' class='input2 inputTrack10Number' type='text' value='' maxlength='8' size='6'/>";
				$inputSubmit = "<input class='buscar' type='submit' name='enviar' value='SEARCH'/>";
				break;
				
			//Caso AIR EUROPA:	
				case 'EUR':
				$form = "<form action='http://www.champ.aero/intraservlet/track' target='_blank' method='POST'>";
				$prefijo = "<input class='prefix' id='awbpre' name='awbpre' type='text' value='745' maxlength='3' size='1' readonly='readonly'/>";
				$inputAwb = "<input class='campo_texto' id='awbnum' name='awbnum' type='text' value='' maxlength='8' size='6' onkeyup='return chkKeyP(event)'/>";
				$inputSubmit = "<input class='buscar' type='submit' id='subTracking' value='SEARCH' name='track'>";
				break;
		
			/*//Caso TACA:
				 case 'TACA':
				$form = "<form method='post' name='Form1' target='_blank' action='https://tacacargo.mercator.com/skychain/app' listener='SyntheticListener[com.emirates.ngcs.nweb.trackshipment.TrackShipmentPage$Enhance_10@ec744f0[nwp:Trackshipmt] public void com.emirates.ngcs.nweb.trackshipment.TrackShipmentPage.formSubmit(org.apache.tapestry.IRequestCycle)]'>";
				$prefijo = "<input type='text' name='txtPrefix' value='530' dataType='NUMBER' title='AWB Prefix' onBlur='onBlur_FieldClassChange(this,'NUMBER','');' onFocus='onFocus_FieldClassChange(this,'NUMBER','');' maxlength='3' size='1' readonly='readonly'/>";
				$inputAwb = "<input type='text' name='txtNumber' dataType='AWBSERIAL' title='AWB Number' onBlur='onBlur_FieldClassChange(this,'AWBSERIAL','');' onFocus='onFocus_FieldClassChange(this,'AWBSERIAL','');' onChange='_awbValidation(this)' maxlength='8' size='6'/>";
				$inputSubmit = "<input type='submit' name='$Submit' value='SEARCH' title='Track'/>";
				$formhidden = "<form method='post' name='Form0' action='https://tacacargo.mercator.com/skychain/app'>
				<input type='hidden' name='service' value='direct/1/nwp:Trackshipmt/$BorderLayout.head.$Form'/>
				<input type='hidden' name='sp' value='S0'/>
				<input type='hidden' name='Form0' value=''/>
				<script>drawMenus();</script>
				</form>";
				$inputshidden = "<input type='hidden' name='service' value='direct/1/nwp:Trackshipmt/trackForm'/>
				<input type='hidden' name='sp' value='S1'/
				<input type='hidden' name='Form1' value='selectDoctype,txtPrefix,txtNumber,txtJrn,txtAWBPrefix,txtAWBNumber,txtAWBPrefix$0,txtAWBNumber$0,txtAWBPrefix$1,txtAWBNumber$1,txtAWBPrefix$2,txtAWBNumber$2,txtAWBPrefix$3,txtAWBNumber$3,txtAWBPrefix$4,txtAWBNumber$4,txtAWBPrefix$5,txtAWBNumber$5,txtAWBPrefix$6,txtAWBNumber$6,txtAWBPrefix$7,txtAWBNumber$7,$FormConditional,$Submit,$Submit$0,$FormConditional$0,$FormConditional$1,reload,pageSize,listSize,advSearch,trackViewHdn'/>
				<input type='hidden' name='trackForm_hdnLastPermissionCheck' id='trackForm_hdnLastPermissionCheck' value=''/>
				<input type='hidden' name='trackForm_hdnLastPermissionCode' id='trackForm_hdnLastPermissionCode' value=''/>
				<input type='hidden' name='hdnFormID' id='hdnFormID' value='trackForm'/>
				<input type='hidden' name='hdnbpval2' id='hdnbpval2' value='false'/>
				<input type='hidden' name='$FormConditional' value='F'/>
				<input type='hidden' name='$FormConditional$0' value='F'/>
				<input type='hidden' name='$FormConditional$1' value='F'/>
				<input type='hidden' name='reload' value=''/>
				<input type='hidden' name='pageSize' value='10'/>
				<input type='hidden' name='listSize' value='0'/>
				<input type='hidden' name='advSearch' value='F'/>
				<input type='hidden' name='trackViewHdn' value='tableRadio'/>
				<input type='hidden' name='selectDoctype' value='AWB' title='Document Type' readOnly='true' style='width: 55px' onChange='setDocPrefix()' onBlur='onBlur_FieldClassChange(this,'null','');' class='inputsReadOnly' onFocus='onFocus_FieldClassChange(this,'null','');'/>";
				break;
				
			//Caso TAMPA:
				case 'TAMPA':
				$inputBl = "input id='j_idt34:j_idt36:tntReferenceText' name='j_idt34:j_idt36:tntReferenceText' onblur='setFocus('');iceSubmitPartial(form, this, event);' onchange='Ice.txtAreaMaxLen(this,1600);' onkeydown='Ice.txtAreaMaxLen(this,1600);' onmousedown='this.focus();' size='14'";
				$form = "form action='http://ecom.hamburgsud.com/ecom/en/ecommerce_portal/track_trace/track__trace/ep_trackandtrace.xhtml' enctype='application/x-www-form-urlencoded' id='j_idt34:j_idt36' method='post' name='j_idt34:j_idt36' TARGET='_blank'";
				$inputSubmit = "input id='j_idt34:j_idt36:btnSearchd' name='j_idt34:j_idt36:btnSearchd' type='submit' value='SEARCH'";
				$hiddenInput1 = "<input name='j_idt34:j_idt36' type='hidden' value='j_idt34:j_idt36' />";
				$hiddenInput2 = "<input name='ice.window' type='hidden' value='26i8kj7p0l' />";
				$hiddenInput3 = "<input name='ice.view' type='hidden' value='v4quzaeprrs' />";
				$hiddenInput4 = "<input name='icefacesCssUpdates' type='hidden' value='' />";
				$hiddenInput5 = "<input type='hidden' name='javax.faces.ViewState' id='javax.faces.ViewState' value='-3651310815995837057:4938041390080079721' autocomplete='off' />";
				break;*/
		}
?>


<div>
		<?php echo $form;?>
		<?php
		  if (isset($inputhidden1)) 
		  {
			echo $inputhidden1;
		  }
		  ?>
          
		  <div class="row top"><span class="tr">PREFIX</span><div> <?php echo $prefijo;?></div></div>
		  <div class="row"><span class="tr">AWN Nº</span><?php echo $inputAwb;?></div>


		
         
			
			  
		
		<?php
		  if (isset($inputshidden)) 
		  {
			echo $inputshidden;
		  }
		  ?>
          <div class="row"><span class="tr"></span>
			<?php echo $inputSubmit?>
            
            </div>
		
		  
		</form>
		
		<?php
		  if (isset($formhidden)) 
		  {
			echo $formhidden;
		  }
		  ?>
		  
</div>