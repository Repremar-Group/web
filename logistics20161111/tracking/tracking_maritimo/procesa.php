<?php
	$comp = $_POST['txtComp'];
	
	switch($comp){
	
	//CASO COSCO
	case "cosco":	
	$numbl = $_POST['txtBlcosco'];
	header ("Location: http://ebusiness.coscon.com/NewEBWeb/public/cargoTracking/cargoTracking.xhtml?CARGO_TRACKING_NUMBER_TYPE=BILLOFLADING&CARGO_TRACKING_NUMBER=$numbl&REDIRECT=1&uid=");
	break;
	
	//CASO CSAV
	case "csav":
	$numbl = $_POST['txtBlcsav'];
	header ("Location: http://www.csav.com/en/CustomerServices/OnlineTools/CargoPosition/Pages/TrackingModule.aspx?param=$numbl");
	break;
	
	//CASO MOL
	case "mol":
	$numbl = $_POST['txtBlmol'];
	header ("Location: http://web.molpower.com//NaviGator/tracking/home/guest?Typ=BL&Flg=Y&Dtls=$numbl");
	break;
	
	//CASO CMA CGM
	case "cma":
	$numbl = $_POST['txtBlcma'];
	header ("Location: https://www.cma-cgm.com/ebusiness/tracking/search?SearchBy=BL&Reference=$numbl&search=Search");
	break;
	
	//CASO ZIM
	case "zim":
	$numbl = $_POST['txtBlzim'];
	header ("Location: http://www.zim.com/pages/findcontainer.aspx?searchtype=1&searchvalue1=$numbl");
	break;
	
	//CASO ZIM
	case "safmarine":
	$numbl = $_POST['txtBlsafmarine'];
	header ("Location: http://mysaf2.safmarine.com/wps/portal/Safmarine/etrackUnregistered?linktype=unreg&queryorigin=Header&queryoriginauto=HeaderNonSecure&searchType=Document&searchNumberString=$numbl");
	break;
	}
?>