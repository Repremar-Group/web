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