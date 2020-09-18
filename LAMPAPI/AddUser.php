<?php
    $inData = getRequestInfo();
	
    $name = $inData["name"];
    $email = $inData["email"];
    $userName = $inData["userName"];
    $password = $inData["password"];

	$conn = new mysqli("localhost", "smallgroup25", "Poosd25Contact", "smallgro_paradise");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "INSERT into Users(Name,Email,Username,Password) VALUES ('" . $name . "','" . $email . "','" . $userName . "','" . $password . "')";
		if( $result = $conn->query($sql) != TRUE )
		{
			returnWithError( $conn->error );
		}
		$conn->close();
	}
	
	returnWithError("");
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
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
