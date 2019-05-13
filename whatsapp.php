<?php
/********************************************************/
/*			Control the weather V1.0					*/
/*			By Albert Seuba	- 042319					*/
/********************************************************/

//$json4 = file_get_contents('php://input'); 
//$object = json_decode($json4, true);
//$missatge = $object['inArguments'][0]['message'];




$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => "https://www.cangureo.es/whatsapp", //print parameters; coming from the webhook;
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => "",
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1
));

$response = curl_exec($curl);
$err = curl_error($curl);
var_dump(curl_init());
curl_close($curl);

if ($err) {
  echo "cURL Error #:" . $err;
} else {

	
};
// parseamos el json por cada user que entra en el journey

//devolvemos el outArgument al config.json para utilizar en la split activity (true | false)
echo '{"status":"ok"}';

?>
