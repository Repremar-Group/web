<?php
	if (!isset($_REQUEST['comp'])) 
	{
		$compa = "CSAV";
	}
	else
	{
		$compa = $_REQUEST['comp'];
	}
	switch($compa){
			//Caso CSAV:
			case 'CSAV':
				$inputBl = "input id='txtCsav' class='campo_texto' type='text' name='txtBlcsav' size='14'";
				$form = "form method='post' action='tracking_maritimo/procesa.php' TARGET='_blank'";
				$inputSubmit = "input class='buscar' type='submit' value='SEARCH'/";
				$compania = "<input name='txtComp' type='hidden' id='txtComp' value='csav'>";
				break;
			
			//Caso COSCO:	
			case 'COSCO':
				$inputBl = "input name='txtBlcosco' class='campo_texto' type='text' id='txtNumbl' size='14'";
				$form = "form method='post' action='tracking_maritimo/procesa.php' TARGET='_blank'";
				$inputSubmit = "input class='buscar' type='submit' value='SEARCH'/";
				$compania = "<input name='txtComp' type='hidden' id='txtComp' value='cosco'>";
				break;
			
			//Caso MSC:	
			case 'MSC':
				$inputBl = "input name='txtBlcosco' class='campo_texto' type='text' id='txtNumbl' size='14'";
				$form = "form method='post' action='tracking_maritimo/procesa.php' TARGET='_blank'";
				$inputSubmit = "input class='buscar' type='submit' value='SEARCH'/";
				$compania = "<input name='txtComp' type='hidden' id='txtComp' value='cosco'>";
				break;
		
			//Caso MAERSK:	
			case 'MAERSK':
				$inputBl = "input name='portlet_trackSimple_1{pageFlow.trackSimpleForm.numbers}' class='campo_texto' type='text' id='numbers' size='14'";
				$form = "form name='trackSimpleForm' id='trackSimpleForm' action='http://classic.maerskline.com:80/appmanager/maerskline/public?_nfpb=true&_windowLabel=portlet_trackSimple_1&portlet_trackSimple_1_actionOverride=%2Fportlets%2Ftracking3%2Ftrack%2FtrackSimple%2FtrackSimple&_pageLabel=page_tracking3_trackSimple' method='post' TARGET='_blank'";
				$inputSubmit = "input class='buscar' type='submit' value='SEARCH'/";
				$hiddenInput1 = "<input type='hidden' name='portlet_trackSimple_1wlw-select_key:{pageFlow.trackSimpleForm.type}OldValue' value='true'>";
				$hiddenInput2 = "<input type='hidden' name='portlet_trackSimple_1wlw-select_key:{pageFlow.trackSimpleForm.type}' id='type' value='BOOKINGNUMBER'>";
				break;
		
			//Caso HAMBURG SUD:	
			case 'HAMBURG SUD':
				$inputBl = "input id='j_idt34:j_idt36:tntReferenceText' class='campo_texto' type='text' name='j_idt34:j_idt36:tntReferenceText' onblur='setFocus('');iceSubmitPartial(form, this, event);' onchange='Ice.txtAreaMaxLen(this,1600);' onkeydown='Ice.txtAreaMaxLen(this,1600);' onmousedown='this.focus();' size='14'";
				$form = "form action='http://ecom.hamburgsud.com/ecom/en/ecommerce_portal/track_trace/track__trace/ep_trackandtrace.xhtml' enctype='application/x-www-form-urlencoded' id='j_idt34:j_idt36' method='post' name='j_idt34:j_idt36' TARGET='_blank'";
				$inputSubmit = "input id='j_idt34:j_idt36:btnSearchd' name='j_idt34:j_idt36:btnSearchd' type='submit' value='SEARCH'";
				$hiddenInput1 = "<input name='j_idt34:j_idt36' type='hidden' value='j_idt34:j_idt36' />";
				$hiddenInput2 = "<input name='ice.window' type='hidden' value='26i8kj7p0l' />";
				$hiddenInput3 = "<input name='ice.view' type='hidden' value='v4quzaeprrs' />";
				$hiddenInput4 = "<input name='icefacesCssUpdates' type='hidden' value='' />";
				$hiddenInput5 = "<input type='hidden' name='javax.faces.ViewState' id='javax.faces.ViewState' value='-3651310815995837057:4938041390080079721' autocomplete='off' />";
				break;
		
			//Caso MOL:	
			case 'MOL':
				$inputBl = "input name='txtBlmol' class='campo_texto' type='text' id='txtBlmol' size='14'";
				$form = "form action='tracking_maritimo/procesa.php' method='post' name='mol' TARGET='_blank'";
				$inputSubmit = "input class='buscar' type='submit' value='SEARCH'/";
				$compania = "<input name='txtComp' type='hidden' id='txtComp' value='mol'>";
				break;
				
			//Caso CHINA SHIPPING:	
			case 'CSCL':
				$inputBl = "input type='text' name='tf_bl_no' class='campo_texto' size='14' onChange='this.value=this.value.toUpperCase()' value=''";
				$form = "form action='http://csp.cscl.com.cn/cargo_track/cargo_track_rst.jsp' method='post' name='form1' TARGET='_blank'";
				$inputSubmit = "input class='buscar' type='submit' name=submit&quot;2 value='SEARCH'/ language=javascript onClick='return check();'";
				$hiddenInput3 = "<input type='hidden' name='tr_num' value='bl_no' checked>";
				$hiddenInput4 = " <input type='hidden' name='lang' value='EN'>";
				break;
				
			//Caso CMA CGM:	
			case 'CMACGM':
				$inputBl = "input name='txtBlcma' class='campo_texto' type='text' id='txtBlcma' size='14'";
				$form = "form action='tracking_maritimo/procesa.php' method='post' name='cma' TARGET='_blank'";
				$inputSubmit = "input class='buscar' type='submit' value='SEARCH'/";
				$compania = "<input name='txtComp' type='hidden' id='txtComp' value='cma'>";
				break;
			
			//Caso ZIM:	
			case 'ZIM':
				$inputBl = "input name='txtBlzim' class='campo_texto' type='text' id='txtBlzim' size='14'";
				$form = "form action='tracking_maritimo/procesa.php' method='post' name='zim' TARGET='_blank'";
				$inputSubmit = "input class='buscar' type='submit' value='SEARCH'/";
				$compania = "<input name='txtComp' type='hidden' id='txtComp' value='zim'>";
				break;
								
			//Caso EVERGREEN:	
			case 'EVERGREEN':
				$head2 = "<script language='JavaScript' src='http://www.shipmentlink.com/tdb1/html/TDB1_CargoTracking_090205.js'>";
				$head3 = "</script>";
				$head4 = "<script language='JavaScript' src='http://www.shipmentlink.com/tuf1/js/TUF1_ToolTip.js'>";
				$head5 = "</script>";
				$head6 = "<script language='JavaScript' src='http://www.shipmentlink.com/tuf1/js/TUF1_DynamicReqV2.js'>";
				$head7 = "</script>";
				$inputBl = "input type='text' name='NO' class='campo_texto' size='15' maxlength='18' value=''";
				$form = "form action='http://www.shipmentlink.com/servlet/TDB1_CargoTracking.do' name='frmCargo' method='post' onkeypress='return frmSubmit(event,1)' TARGET='_blank'";
				$inputSubmit = "input type='button' class='buscar' align='absmiddle' value='SEARCH' onclick='this.disabled=true;javascript:frmSubmit(13,2);'";		
				$hiddenInput1 = "<input type='hidden' name='TYPE'>";
				$hiddenInput2 = "<input type='hidden' name='BL'>";
				$hiddenInput3 = "<input type='hidden' name='CNTR'>";
				$hiddenInput4 = "<input type='hidden' name='bkno'>";
				$hiddenInput6 = "<input type='hidden' name='query_bkno'>";
				$hiddenInput7 = "<input type='hidden' name='query_rvs'>";
				$hiddenInput8 = "<input type='hidden' name='query_docno'>";
				$hiddenInput9 = "<input type='hidden' name='query_seq'>";
				$hiddenInput10 = "<input type='hidden' name='PRINT'>";
				$hiddenInput11 = "<input type='radio' value='s_bl' name='SEL' checked hidden>";
				$hiddenInput12 = "<input type='radio' value='s_cntr' name='SEL' hidden>";
				$hiddenInput13 = "<input type='radio' value='s_bk' name='SEL' hidden>";
				break;
				
			//Caso NYK:	
				case 'NYK':
				$inputBl = "input name='searchText' size='14' type='text' onkeyup='onKeyUpTextArea(this, MAX_SEARCH_CHAR, event)' onchange='onChangeTextArea(this, MAX_SEARCH_CHAR)' onfocus='textareaOnFocus(this)' class='formObjects campo_texto'";
				$form = "form name='searchForm' method='post' action='https://www2.nykline.com/ct/containerSearch.nyk?lang=en&country=USA' id='searchForm' target='_blank'";
				$inputSubmit = "input type='submit' class='buscar' value='SEARCH'";
				$hiddenInput1 = "<input type = 'hidden' name = 'fromCT' value='true'/>";
				break;

			//Caso PIL:	
			case 'PIL':
				$inputBl = "input size='14' id='refnumbers' type='text' name='refnumbers' class='autosize gray-text campo_texto'";
				$form = "form id='form_tracktrace' method='POST' action='https://www.pilship.com/en-our-track-and-trace-pil-pacific-international-lines/120.html' target='_blank'";
				$inputSubmit = "input type='submit' class='buscar' value='SEARCH'";
				$hiddenInput3 = "<select id='search_type' name='search_type' hidden>
								<option value='bl'>B/L Number</option>
								</select>";
				break;
						
			//Caso SAFMARINE:
			case 'SAFMARINE':
				$inputBl = "input id='txtSafmarine' class='campo_texto' type='text' name='txtBlsafmarine' size='14'";
				$form = "form method='post' action='tracking_maritimo/procesa.php' TARGET='_blank'";
				$inputSubmit = "input type='submit' class='buscar' value='SEARCH'/";
				$compania = "<input name='txtComp' type='hidden' id='txtComp' value='safmarine'>";
				break;
						
			//Caso UASC:	
			case 'UASC':
				$inputBl = "input id='trackText' class='campo_texto' type='text' onfocus='requiredval2()' onkeyup='isAlphaNum(this)' size='14' name='Sequence'";
				$form = "form action='http://uasconline.uasc.net/TrackingResults' id='TrackHome' method='post' TARGET='_blank'";
				$inputSubmit = "input class='buscar' id='j_idt34:j_idt36:btnSearchd' name='j_idt34:j_idt36:btnSearchd' type='submit' value='SEARCH'";
				$hiddenInput1 = "<input id='iId' type='hidden' value='182000' name='iId'>";
				$hiddenInput2 = "<input type='hidden' value='null' name='userId'>";
				$hiddenInput3 = "<input type='hidden' value='A' name='type'>";
				$hiddenInput4 = "<input type='hidden' value='' name='NameList'>";
				break;
				
		}
?>

<div>
		<?php
		  if (isset($head1)) 
		  {
			echo $head1;
		  }
		  if (isset($head2)) 
		  {
			echo $head2;
		  }
		  if (isset($head3)) 
		  {
			echo $head3;
		  }
		  if (isset($head4)) 
		  {
			echo $head4;
		  }
		  if (isset($head5)) 
		  {
			echo $head5;
		  }
		  if (isset($head6)) 
		  {
			echo $head6;
		  }
		  if (isset($head7)) 
		  {
			echo $head7;
		  }
		  ?>
	

	
		<<?php echo $form; ?>>
		
		<?php
		  if (isset($hiddenInput1)) 
		  {
			echo $hiddenInput1;
		  }
		  if (isset($hiddenInput2)) 
		  {
			echo $hiddenInput2;
		  }
		  if (isset($hiddenInput3)) 
		  {
			echo $hiddenInput3;
		  }
		  if (isset($hiddenInput4)) 
		  {
			echo $hiddenInput4;
		  }
		  if (isset($hiddenInput5)) 
		  {
			echo $hiddenInput5;
		  }
		  if (isset($hiddenInput6)) 
		  {
			echo $hiddenInput6;
		  }
		  if (isset($hiddenInput7)) 
		  {
			echo $hiddenInput7;
		  }
		  if (isset($hiddenInput8)) 
		  {
			echo $hiddenInput8;
		  }
		  if (isset($hiddenInput9)) 
		  {
			echo $hiddenInput9;
		  }
		  if (isset($hiddenInput10)) 
		  {
			echo $hiddenInput10;
		  }
		  if (isset($hiddenInput11)) 
		  {
			echo $hiddenInput11;
		  }
		  if (isset($hiddenInput12)) 
		  {
			echo $hiddenInput12;
		  }
		  if (isset($hiddenInput13)) 
		  {
			echo $hiddenInput13;
		  }
		  ?>
          
          
 <div class="row"><span class="tr">B/L Nº</span><<?php echo $inputBl; ?>></div> 
		

 <div class="row"><span class="tr"></span><<?php echo $inputSubmit; ?>></div>

		
		 
          <?php
		  if (isset($compania)) 
		  {
			echo $compania;
		  }
		  ?>
		</form>

</div>