<?
$nome = $_POST['nome'];
$email = $_POST['email'];
$mensagem = $_POST['mensagem'];

$conteudo = "Nome: $nome <br>E-mail: $email<br>Mensagem: $mensagem";
$seuemail = "theosierra@gmail.com"; 
$headers = "MIME-Version: 1.0\r\n"; 
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 
$headers .= "Content-Type: text/plain; charset = \"UTF-8\";\n";
$headers .= "Content-Transfer-Encoding: 8bit\n";
$headers .= "\n";
$headers .= "From: $email \r\n"; 
$assunto = "Contato do site";

$enviar = mail($seuemail, $assunto, $conteudo, $headers); 

if($enviar) {
echo "<script type='text/javascript'> alert('Contato Enviado com Sucesso!'); window.location.href='contato.html'; </script>";
}else{
echo "<script type='text/javascript'> alert('Ocorreu algum erro ao enviar o formul&aacute;rio'); </script>";
}

?>