<?php
	
	require_once("Classes/class.phpmailer.php");
	require_once("Classes/class.smtp.php");
	require_once("seguridad.php");
	require_once("variables.php");

	// obtengo los datos enviados por post 
 
	$nombre = $_POST['txtNombre'];
	$apellido = $_POST['txtApellido'];
	$ci = $_POST['txtCedula'];
	
	
	
	//CONTROLO QUE ESTE EL ADJUNTO
	if ($_FILES["file"]["name"] != ""){
	
		//controlar que los campos obligatorios esten completos
		if (($nombre == "" || ($apellido == "" || (solo_letras($nombre)==false || (solo_letras($apellido)==false)))))
		{
			echo 
			"<script language='javascript'> 
				alert('Por favor complete todos los campos: Nombre y Apellido. \\nTenga en cuenta que en los campos mencionados no puede ingresar simbolos ni numeros.');
				function redireccionar(){window.location='rrhh.php';}		
				setTimeout ('redireccionar()', 1);
			</script>";
		}else {
			//subo archivo
			if (isset($_POST['submit']))
			{
				//controlo tipo de archivos y tamaño
				
				$extension = end(explode(".", $_FILES["file"]["name"]));

				if( ! ( in_array($extension, $tipos_archivos ) ) ) {
				  echo 
					"<script language='javascript'> 
						alert('Formato de archivo invalido, favor adjuntar curriculum en: pdf, doc, docx u odt. Gracias.');
						function redireccionar(){window.location='rrhh.php';}		
						setTimeout ('redireccionar()', 1);
					</script>";
					die();
				}
				
				if ($_FILES["file"]["size"] > $max_perm || $_FILES["file"]["size"] <= 0) 
				{
					echo 
						"<script language='javascript'> 
							alert('Su archivo supera el limite de tama\u00f1o permitido, favor subir un archivo que no supere los 3Mb.');
							function redireccionar(){window.location='rrhh.php';}		
							setTimeout ('redireccionar()', 1);
						</script>";
				}
				
				
				
				else 
					{
						if (file_exists($path . $_FILES["file"]["name"])) 
						{
							echo $_FILES["file"]["name"] . " already exists. ";
						}
						else 
						{
							move_uploaded_file($_FILES["file"]["tmp_name"], $path . $_FILES["file"]["name"]);
							
							//envio mail
							if (isset($_POST['submit'])) 
							{
								
								//ARMO EL CUERPO DEL MAIL
								$mensaje = "*************************************************************************************";
								$mensaje = $mensaje."\n                      FORMULARIO DE PAGINA WEB |WORK WITH US|                    	 ";
								$mensaje = $mensaje."\n*************************************************************************************";
								$mensaje = $mensaje."\n";
								$mensaje = $mensaje."\n NOMBRE:                   : $nombre ";	
								$mensaje = $mensaje."\n APELLIDO:                 : $apellido ";
								$mensaje = $mensaje."\n CEDULA:                   : $ci ";
									
								$mail = new PHPMailer();
								$mail->From = $remitente;
								$mail->FromName = "Web Repremar | Work With Us";
								$mail->Subject = "Solicitud De Empleo";
									
								$mail->Body = ($mensaje);						// Se arma el cuerpo del mensaje.
								$mail->AddAddress($destinatario);				// Se añade destinatario al cual se quiere que llegue el mail.
								$mail->AddBCC($bcc);							// Se añade destinatario en copia oculta para prueba.
								$mail->AddBCC($bcc2);							// Se añade destinatario en copia oculta para prueba.
								$archivo = $path .$_FILES["file"]["name"];		// Se toma archivo de una carpeta de Servidor
								$mail->AddAttachment($archivo,$archivo);		// Se adjunta archivo al mail
								$mail->IsSMTP(); 								// telling the class to use SMTP
								$mail->Host       = $smtp; 						// SMTP server
								$mail->SMTPAuth   = true;                  		// enable SMTP authentication
								$mail->Host       = $smtp; 						// sets the SMTP server
								$mail->Port       = $port;                    	// set the SMTP port
								$mail->Username   = $user; 						// SMTP account username
								$mail->Password   = $password;        			// SMTP account password
									
								$mail->Send();
								
								//Eliminar archivo del directorio
								$dir = $path;
								$handle = opendir($dir);
								while ($file = readdir($handle)) 
								{
									if (is_file($dir.$file)) 
									{
										(unlink($dir.$file));
									}
								}
								
								//Muestro mensaje de envio satisfactorio.
								echo 
								"<script language='javascript'>	
									alert('Su mensaje ha sido enviado, gracias por su interes');
									function cierra(){window.close();}
									setTimeout ('cierra()', 1);
								</script>";								
							}
						}
					}
			}
			
				else 
				{
					echo 
					"<script language='javascript'>	
						alert('Archivo Invalido');
						function redireccionar(){window.location='rrhh.php';}		
						setTimeout ('redireccionar()', 1);
					</script>";
				}
		}
			
	}else{
		echo 
			"<script language='javascript'> 
				alert('Por favor Adjunte su Curriculum.');
				function redireccionar(){window.location='rrhh.php';}		
				setTimeout ('redireccionar()', 1);
			</script>";
		}

?>


