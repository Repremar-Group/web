<?php
	require 'phpmailer/Exception.php';
	require 'phpmailer/PHPMailer.php';
	require 'phpmailer/SMTP.php';
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	use PHPMailer\PHPMailer\SMTP;
 
	$emailed = false;
	if(!empty($_POST['Nombre2'])) {
		$mail = new PHPMailer(true);

		$Nombre2 = $_POST['Nombre2'];
		$apellido2 = $_POST['apellido2'];
		$email2 = $_POST['email2'];
		$fcomentarios2 = nl2br($_POST['comentarios2']);

		$asunto = "Contacto desde la landing ";
		$mensaje = "El siguiente mensaje fue recibido desde el formulario web de Repremar";
		$mensaje .= "Nombre: {$Nombre2} \nApellido: {$apellido2}\nEmail: {$email2}\nMensaje:\n {$fcomentarios2}";	

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