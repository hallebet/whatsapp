<?php
/********************************************************/
/*			Whatsapp answer endpoint					*/
/*			By Albert Seuba	- 042319					*/
/********************************************************/
$json4 = file_get_contents('php://input'); 

$object = json_decode($json4, true);
$telefono = $object['from'];
$missatge = $object['body'];

echo $missatge;
echo ('hola');
$ur = 'https://www.cangureo.es/public/answer?message='.$missatge.'&telefono='.$telefono;
$ch = curl_init($ur);
$http_headers = array(
    'User-Agent: Junk', // Any User-Agent will do here
);
curl_setopt($ch, CURLOPT_HEADER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $http_headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
echo $response;
//devolvemos el outArgument al config.json para utilizar en la split activity (true | false)
//echo '{"status":"ok"}';
//echo $ur;
?>
