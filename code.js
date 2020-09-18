var urlBase = 'paradisecontacts.club';

var userId = 0;
var userName = "";

// Sends username and password to backend and recieves
// userID, userName, then redirects to contacts.html
function doLogin()
{
   // reset login values
	userId = 0;
	userName = "";

   // pull username and hash password
	var login = document.getElementById("username").value;
   var hash = md5(document.getElementById("password").value);

	document.getElementById("loginResult").innerHTML = "";

   var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var url = urlBase + '/Login.php';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse( xhr.responseText );

      // set user Id
		userId = jsonObject.id;

		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
      else
      {
         // set users name
   		userName = jsonObject.name;

   		saveCookie();

         // redirect to contact page
   		window.location.href = "contacts.html";
      }


	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

// Saves cookie with
// userName, userId, and date
function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "userName=" + userName + ",userId=" + userId + ";expires=" + date.toGMTString();
}

// Sets userName, and userId from readCookie
// if no userId sends user to index.html
function readCookie()
{
	userId = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++)
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "userName" )
		{
			userName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userId = parseInt( tokens[1].trim() );
		}
	}

	if( userId < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + userName;
	}
}

// Resets user info, clears cookie, sends user to index.html
function doLogout()
{
	userId = 0;
	userName = "";
	document.cookie = "userName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

// sends contactId to be deleted
function deleteContact()
{
   // Get contectId to be deleted
   // NEEDS TO BE FLESHED OUT
   var deleteId = document.getElementById("contactId").value;

   // Create payload
   var jsonPayload = '{"ID" : ' + deleteId + '}';
	var url = urlBase + '/DeleteContact.php';

   var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

   try
	{
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		alert(err.message);
	}
}

// Sends new user info to be added then returns to index.html
function addUser()
{
   // Get user info
   var name = document.getElementById("name").value;
   var addUsername = document.getElementById("username").value;
   var hash = md5(document.getElementById("password").value);
   var email = document.getElementById("email").value;

   document.getElementById("signupResult").innerHTML = "";

   if(name && addUsername && hash && email) // Check that user filled out all fields
   {
      // Create payload
      var jsonPayload = '{"name" : "' + name + '", "userName" : "' + addUsername + '", "password" : "' + hash +'", "email" : "' + email +'"}';
   	var url = urlBase + '/AddUser.php';

      var xhr = new XMLHttpRequest();
   	xhr.open("POST", url, false);
   	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

      try
   	{
   		xhr.send(jsonPayload);
         // Return to login page
         window.location.href = "index.html";
   	}
   	catch(err)
   	{
   		alert(err.message);
   	}
   }
   else
   {
      document.getElementById("signupResult").innerHTML = "Please fill out all fields";
   }
}

// Sends new contact info to be added
function addContact()
{
   // Get user info
   // NEEDS TO BE FLESHED OUT
   var name = document.getElementById("name").value;
   var address = document.getElementById("address").value;
   var phone = document.getElementById("phone").value;
   var email = document.getElementById("email").value;

   if(name && address && phone && email) // Check that user filled out all fields
   {
      // Create payload
      var jsonPayload = '{"userId" : ' + userId + ', "name" : "' + name + '", "address" : "' + address + '", "phone" : "' + phone + '", "email" : "' + email + '"}';
   	var url = urlBase + '/AddContact.php';

      var xhr = new XMLHttpRequest();
   	xhr.open("POST", url, false);
   	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

      try
   	{
   		xhr.send(jsonPayload);
   	}
   	catch(err)
   	{
   		alert(err.message);
   	}
   }
   else // Did not fill out all fields
   {
      alert("Please fill out all fields");
   }
}

// Sends search data, then displays matching contacts
function searchContacts()
{

   // pull search
	var searchQuery = document.getElementById("searchQuery").value;

   var jsonPayload = '{"search" : "' + searchQuery + '", "userId" : ' + userId + '"}';
	var url = urlBase + '/SearchContact.php';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse( xhr.responseText );

      // WRITE TABLE SETUP CODE HERE

	}
	catch(err)
	{
		alert(err.message);
	}

}

// Sends new contact info to be edited
function editContact()
{
   // Get user info
   // NEEDS TO BE FLESHED OUT
   var contactId = document.getElementById("contactId").value;
   var name = document.getElementById("name").value;
   var address = document.getElementById("address").value;
   var phone = document.getElementById("phone").value;
   var email = document.getElementById("email").value;

   if(name && address && phone && email) // Check that user filled out all fields
   {
      // Create payload
      var jsonPayload = '{"ID" : ' + contactId + ', "name" : "' + name + '", "address" : "' + address + '", "phone" : "' + phone + '", "email" : "' + email + '"}';
   	var url = urlBase + '/EditContact.php';

      var xhr = new XMLHttpRequest();
   	xhr.open("POST", url, false);
   	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

      try
   	{
   		xhr.send(jsonPayload);
   	}
   	catch(err)
   	{
   		alert(err.message);
   	}
   }
   else // Did not fill out all fields
   {
      alert("Please fill out all fields");
   }
}
