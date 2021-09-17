<?php 

$carriers_maritimos = array("CSAV","MSC","MAERSK","MOL","CHINA SHIPPING","CMA CGM","ZIM","EVERGREEN","NYK","PIL","SAFMARINE","UASC","*HAMBURG SUD","*MSC","*HANJIN","**HAPAG LLOYD");


$carriers_aereos = array("EMIRATES,176","LATAM,145","LUFTHANSA,020","TACA,530","TAMPA,729","AMERICAN,001","COPA,230","IBERIA,075","GOL,127","AIR FRANCE,057","AEROLINEAS ARGENTINAS,044","AIR EUROPA,745");


?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<LINK href="CSS/main.css" rel="stylesheet" type="text/css">
<link href='http://fonts.googleapis.com/css?family=Open+Sans:300' rel='stylesheet' type='text/css'>
<meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1, user-scalable=no" />
<title>Cargo Tracking</title>
</head>

<body>
<div class="header">
  <div class="logo"> <img class="img_logo" width="280" height="70" src="img/cargo_tracking_logo.png" /> 
  <div class="cont_botones_2"> <a href="#" class="btn_ios"><img src="img/ios_2.png" /></a> <a href="#" class="btn_contacto">Contact Us</a> </div></div>
</div>
<div class="content">
  <div class="row"><span class="tr">TYPE</span>
    <select onchange="cargarCampos($(this).val())">
      <option>SELECT</option>
      <option>MARITIME</option>
      <option>AIR</option>
    </select>
  </div>
  <div id="cargarContenido"> </div>
  <div id="contenido_maritimo" style="display:none;">
    <div class="linea_blanca"></div>
    <div class="row linea"><span class="tr">CARRIER</span>
      <select onchange="cargarInfoMaritimo($(this).val())">
        <option>SELECT</option>
        <?php foreach ($carriers_maritimos as $carrier){ ?>
        <option><?php echo $carrier; ?></option>
        <?php } ?>
      </select>
    </div>
    <div class="linea_blanca"></div>
    <div id="datos_maritimos"></div>
	<br><br><br><br><br><br><br><br>
	<font size="2">(*) Redireccionan a la web del carrier.<br>
	(**) Se requiere login en la web del carrier.</font>
  </div>
  <div id="contenido_aereo" style="display:none;">
    <div class="linea_blanca"></div>
    <div class="row linea"><span class="tr">AIRLINE</span>
      <select onchange="cargarInfo($(this).val())">
        <option>SELECT</option>
        <?php foreach ($carriers_aereos as $carrier){ $datos = explode(',',$carrier); ?>
        <option value="<?php echo $datos[0]; ?>"><?php echo $datos[0]; ?></option>
        <?php } ?>
      </select>
    </div>
    <div class="linea_blanca"></div>
    <div id="datos_aereos"></div>
  </div>
</div>
<div class="cont_botones_1"> <a href="#" class="btn_ios"><img src="img/ios.png" /></a> <a href="#" class="btn_contacto">Contact Us</a> </div>
</body>
<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
<script type="text/jscript">

function  cargarCampos(a){
	if (a=='AIR'){$('#cargarContenido').html($('#contenido_aereo').html());} else if(a=='MARITIME') {$('#cargarContenido').html($('#contenido_maritimo').html());}else{$('#cargarContenido').html('');}
	}
	
function  cargarInfo(p){
	
	if (p =='TACA'){$('#datos_aereos').load('tracking_aereo/comp/taca.php');}
	else if (p =='TAMPA'){$('#datos_aereos').load('tracking_aereo/comp/tampa.php');}
	else if (p =='GOL'){$('#datos_aereos').load('tracking_aereo/comp/gol.php');}
	else if (p =='AIR FRANCE'){$('#datos_aereos').load('tracking_aereo/comp/airfrance.php');}
	else if (p =='AEROLINEAS ARGENTINAS'){$('#datos_aereos').load('tracking_aereo/central.php?comp=ARG');}
	else if (p =='AIR EUROPA'){$('#datos_aereos').load('tracking_aereo/central.php?comp=EUR');}
	else {
		$('#datos_aereos').load('tracking_aereo/central.php?comp='+p);
	}
	}	
	

function cargarInfoMaritimo(p){
	if (p =='*HAMBURG SUD'){ window.location ="https://ecom.hamburgsud.com/ecom/en/ecommerce_portal/track_trace/track__trace/ep_trackandtrace.xhtml?lang=EN";}	else 
	if (p =='*MSC'){ window.location ="https://www.msc.com/ury/help-centre/tools/track-a-shipment";}	else	
	if (p =='*HANJIN'){ window.location ="https://www.hanjin.com/hanjin/CUP_HOM_3301.do";} else	
	if (p =='**HAPAG LLOYD'){ window.location ="https://www.hapag-lloyd.com/es/tracing/by_booking.html";} else
	if (p =='CHINA SHIPPING'){$('#datos_maritimos').load('tracking_maritimo/central.php?comp=CSCL'); } else
	if (p =='CMA CGM'){$('#datos_maritimos').load('tracking_maritimo/central.php?comp=CMACGM'); } else
	
	
	
	$('#datos_maritimos').load('tracking_maritimo/central.php?comp='+p);
	

}

</script>
</html>
