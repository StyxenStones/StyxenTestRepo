import React from 'react';
import GroupMoviesList from './GroupMoviesList'

const app_name = 'cine-mates'
function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else {
        return 'http://localhost:5000/' + route;
    }
}

var groupId;
var groupName;
var groupDescription;
var members;
var token;

//Edit Group variables
var editGroupName;
var editGroupDescription;
var addMemberId;

const doAddMember = async event => // Needs to Take in userID to add and make API call
    {
    event.preventDefault();
    };
const doEditGroup = async event => // Needs to make API call and Replace localstorage with new info
{
    event.preventDefault();

    var obj = {token:token,groupID:groupId,name:editGroupName.value,description:editGroupDescription.value};
    var js = JSON.stringify(obj);

    //API call
    try {
            const response = await fetch(buildPath('api/EditGroup'), {
                method:'POST',body:js,headers:{
                    'Content-Type': 'application/json'
                }
            });
            window.location.reload(false);
        }
    catch(e)
    {
        alert(e.toString());
        return;
    }
};

function Group() {

    var _gd = localStorage.getItem('group_info');
    var gd = JSON.parse(_gd);
    groupId = gd._id;
    groupName = gd.name;
    groupDescription = gd.description;
    members = gd.members;

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    token = ud.token;

    return(
        <div>
            <div id="groupInfo">
                <h1 id="groupName">{groupName}</h1>
                <h3 id="groupDescription">{groupDescription}</h3>
                <div id="memberButtons">
                </div>
                <button type="button" id="addMemberButton" class="buttons"> Add Member </button>
            </div>
            <div id='groupMoviesDiv' >
                <GroupMoviesList />
            </div>
            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#form">
                Edit Group
            </button>
                <div>
                <div class="modal fade" id="form" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                    <div class="modal-header border-bottom-0">
                        <h5 class="modal-title" id="exampleModalLabel">Edit Group</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div>
                    <form onSubmit={doEditGroup}>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="groupname">Group Name</label>
                                <input type="text" class="form-control" id="group-name" aria-describedby="group-name" placeholder={groupName} ref={(c) => editGroupName = c}></input>
                                <small id="group-name" class="form-text text-muted">Name your group</small>
                            </div>
                            <div class="form-group">
                                <label for="group-description">Group Description</label>
                                <input type="text" class="form-control" id="group-description" aria-describedby="group-description" placeholder={groupDescription} ref={(c) => editGroupDescription = c}></input>
                                <small id="group-description" class="form-text text-muted">Describe your group</small>
                            </div>
                        </div>
                        <div class="modal-footer border-top-0 d-flex justify-content-center">
                        <button type="submit" class="btn btn-success" onClick={doEditGroup}>Submit</button>
                        </div>
                    </form>
                </div>
                </div>
                </div>
                </div>
            </div>
        </div>
   );
}

export default Group;
