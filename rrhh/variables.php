<?php
//VARIABLES

$destinatario = "rrhh@repremar.com"; // quien recibe el mail del formulario
$bcc = "smalo@repremar.com";
$bcc2 = "gmonzon@repremar.com";
$remitente = "no-reply@repremar.com"; // nombre con el cual llega el correo.
$path = "uploads/"; // ruta donde se guardan los adjuntos.

//tipos de archivo permitidos
$tipos_archivos = array(
  "pdf", 
  "doc", 
  "docx",
  "odt"
); 

$tiposMime = array( 
  'application/msword',
  'text/pdf'
);


//TAMAÑO MAXIMO PERMITIDO
$max_perm = "3145728";
//SOLO NUMEROS EN CI

//Funcion para comprobar si son letras o si el campo esta vacio.
function solo_letras($string){ 
		$permitidos = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ "; 
		if($string != "")
		{
			for ($i=0; $i<strlen($string); $i++)
			{
				if (strpos($permitidos, substr($string,$i,1))===false)
				{ 
					return false; 
				} 
			}  
		}
		return true;
	}
?>