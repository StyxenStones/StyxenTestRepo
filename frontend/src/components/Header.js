import React from 'react';

function Header()
{

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

    const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("user_data")
        window.location.href = '/';

    };

    const openNotifications = event => 
    {
	    event.preventDefault();
    };

    const openNotifications = event => 
    {
        event.preventDefault();
    };
    const openNotifications = event => 
    {
        event.preventDefault();
    };  

    return(
        <div id="headerDiv">
            <button type="button" id="AccountButton" class="buttons" onClick={openAccount}> {firstName} </button>
            <span id="groupSelector">Group</span><br />
            <button type="button" id="notificationsButton" class="buttons" onClick={openNotifications}> Notifications </button>
            <button type="button" id="settingsButton" class="buttons" onClick={openSettings}> Settings </button>
            <button type="button" id="logoutButton" class="buttons" onClick={doLogout}> Log Out </button>
        </div>
    );
};

export default Header;
