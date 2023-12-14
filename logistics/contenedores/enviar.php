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

		$Nombre = $_POST['Nombre'];
		$apellido = $_POST['apellido'];
		$email = $_POST['email'];
		$fcomentarios = nl2br($_POST['comentarios']);

		$asunto = "Contacto desde la landing ";
		$mensaje = "El siguiente mensaje fue recibido desde el formulario web de Repremar";
		$mensaje .= "Nombre: {$Nombre} \nApellido: {$apellido}\nEmail: {$email}\nMensaje:\n {$fcomentarios}";	

		$mail->setFrom('no-reply@repremar.com.uy', 'Landing Repremar');

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