<?php

	$inData = getRequestInfo();
	
	$id = 0;
	$name = "";

	$conn = new mysqli("localhost", "smallgroup25", "Poosd25Contact", "smallgro_paradise");
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$sql = "SELECT ID,name FROM Users where Username='" . $inData["login"] . "' and Password='" . $inData["password"] . "'";
		$result = $conn->query($sql);
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$name = $row["name"];
			$id = $row["ID"];
			
			returnWithInfo( $name, $id );
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}
	
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
		$retValue = '{"id":0,"name":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $name, $id )
	{
		$retValue = '{"id":' . $id . ',"name":"' . $name . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
