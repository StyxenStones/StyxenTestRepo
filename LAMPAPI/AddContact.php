<?php
    $inData = getRequestInfo();
	
	$userId = $inData["userId"];
	$name = $inData["name"];
    $address = $inData["address"];
    $phone = $inData["phone"];
    $email = $inData["email"];

	$conn = new mysqli("localhost", "smallgroup25", "Poosd25Contact", "smallgro_paradise");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "INSERT into Contacts (UserID,Name,Address,Phone,Email,DateCreated) VALUES (" . $userId . ",'" . $name . "','" . $address . "','" . $phone . "','" . $email . "', curdate())";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}
	
	returnWithError("");
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'),true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>