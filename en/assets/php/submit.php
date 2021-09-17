<?php
$your_email="group@repremar.com";

if(!empty($_POST))
{
	$name=$_POST['name'];
	$email=$_POST['email'];
	$subject="Mensaje desde Web";
	$message=$_POST['message'];
	
	$to      = $your_email;
	$subject = 'Contact Form : '.$subject;
	$headers = 'From: '.$name.' <'.$email.'>' . "\r\n";
	$message = $name.' sent you a message via the contact form :'."\r\n".$message;
	
	mail($to, $subject, $message, $headers);
}

?>