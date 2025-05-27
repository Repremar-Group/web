<?php
$your_email="shipping@repremar.com";

if(!empty($_POST))
{
	$name=$_POST['name'];
	$email=$_POST['email'];
	$subject=$_POST['subject'];
	$message=$_POST['message'];
	
	$to      = $your_email;
	$subject = 'Formulario web REPREMAR Shipping'.$subject;
	$headers = 'From: '.$name.' <'.$email.'>' . "\r\n";
	$message = $name.' sent you a message via the contact form :'."\r\n".$message;
	
	mail($to, $subject, $message, $headers);
}

?>