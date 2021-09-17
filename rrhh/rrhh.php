<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>RRHH</title>
<link rel="stylesheet" href="CSS/main.css">

<style type="text/css">
body {
	margin-left: 0px;
}
</style>
</head>

<body scrolling="no" style="overflow:hidden">
<header>
<img class="logo" src="img/logo.png" width="188" height="41" /><br />
</header>
<section> 
  <p>&nbsp;</p>
  <form action="procesa_form.php" method="post" enctype="multipart/form-data">
  <div align="absmiddle" >
    <p><img src="img/workwithus.PNG" width="305" height="50" /></p>
		<p><img src="img/firstname.PNG" /><br />
		  <input name="txtNombre" type="text" class="txtbox" id="txtNombre" size="56" maxlength="20" />
		  </p>
		<p>		  <img src="img/apellido.PNG" /><br />
		  <input name="txtApellido" type="text" class="txtbox" id="txtApellido" size="56" maxlength="20" />
		</p>
		<p>		  <img src="img/cedula.PNG" /><br />
		  <input name="txtCedula" type="text" class="txtbox" id="txtCedula" size="56" maxlength="20" />
		</p>
		<div class="upload">
			<input type="file" name="file" id="file" />
		</div><br />
		
		<p>
		<div class="submit">
		  <input type="submit" name="submit" value="Submit" />
		<br>
		<br>
		</div>
	</p>
	</div>
</form>
</section>

</body>
</html>