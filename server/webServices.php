<?php

//to be included, array $busses depth-48x2 has bus information 

error_reporting(E_ALL); 
ini_set('display_errors', 1);
include_once 'simpleDOM.php';

	$busDeparturesWS = file_get_html('https://webservices.runshaw.ac.uk/bus/busdepartures.aspx');
	
	//$ws_doc = new DOMDocument();
	libxml_use_internal_errors(TRUE);
	
	$busses = array();
	
	foreach($busDeparturesWS->find("table tr") as $dataRow){
		
		
		$busNumber = $dataRow->find('td');
		$busStand = $dataRow->find('td', 1);
		
		if($busStand->plaintext == null || $busStand->plaintext == "&nbsp;"){
			$busStand->plaintext = "";
		}
		
		$tmp_array = array(
			"number"=>$busNumber[0]->plaintext,
			"location"=>$busStand->plaintext
		);
		array_push($busses, $tmp_array);
	}
	
	//adding the header content/type mime types
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json charset=utf-8');
	echo json_encode($busses);
?>
