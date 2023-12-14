<?php
	require 'phpmailer/Exception.php';
	require 'phpmailer/PHPMailer.php';
	require 'phpmailer/SMTP.php';
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	use PHPMailer\PHPMailer\SMTP;
 
	$emailed = false;
	if(!empty($_POST['Nombre'])) {
		$mail = new PHPMailer(true);
		//codigo nuestro sacado de calidad
		//Configuración del server
		$mail->CharSet= 'utf-8';                   //Seteo el UTF-8
		$mail->SMTPDebug = 0;                      //Desactivo los logs
		$mail->isSMTP();                           //Envío usando SMTP
		$mail->Host       = 'smtp.office365.com';  //Seteo el SMTP de O365
		$mail->SMTPAuth   = true;                  //Activo la autenticación SMTP
		$mail->Username   = 'alertas@repremar.com';                   
		$mail->Password   = 'Sol84186';                               
		$mail->SMTPSecure = 'tls';                 //Activo TLS
		$mail->Port       = 587;     
		//fin codigo nuestro
		$Nombre = $_POST['Nombre'];
		$apellido = $_POST['apellido'];
		$email = $_POST['email'];
		$fcomentarios = nl2br($_POST['comentarios']);

		$asunto = "Contacto desde la landing ";
		$mensaje = "El siguiente mensaje fue recibido desde el formulario web de Repremar";
		$mensaje .= "Nombre: {$Nombre} \nApellido: {$apellido}\nEmail: {$email}\nMensaje:\n {$fcomentarios}";	

		$mail->setFrom('alertas@repremar.com', 'Alertas');

	  	$mail->AddAddress('contenedores@repremar.com');
		$mail->Subject = $asunto;
		$mail->Body = nl2br($mensaje);
		$mail->IsHTML(true);
		$mail->CharSet = 'UTF-8';
		$mail->Send();


		                                                                                                                     
		$emailed = true;

	}
	header("Location: ../".$_POST['url']."index.php");die;
?>