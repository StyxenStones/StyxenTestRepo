import React from 'react';
import MainHeader from './MainHeader';
import Gallery from './Gallery';

const app_name = 'cine-mates'
function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else {
        return 'http://localhost:5000/' + route;
    }
}

// User info
var userId;
var login;
var token;

// Will contain info from the API calls
var moviesList;

// divs to be filled out onload and added to page
var MoviesDiv;

// Takes what is in movieList and adds them to moviesDiv
function createMoviesList()
{
  let children = moviesList.movies.map((val, index) => {
    return (
      React.createElement("button", {id: index, onClick: () =>movieButton()}, val.title)
    )
  })
  // the div with children inside
    MoviesDiv =  React.createElement("div", {className: "contexCon"},children);
}
funtion movieButton()
{
    var modal = document.getElementById("form");
    modal.aria-hidden =  false;
}

function MoviesList() {

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    userId = ud.id;
    login = ud.login;
    token = ud.token;

    //Get Groups
    var obj = {token:token,userID:userId};
    var js = JSON.stringify(obj);

    // API Call
    var xhr = new XMLHttpRequest();
	xhr.open("POST", buildPath('api/GetMovies'), false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
            xhr.send(js);

            moviesList = JSON.parse(xhr.responseText); // Adds response to moviesList
            createMoviesList();
        }
    catch(e)
    {
        alert(e.toString());
        return;
    }
    return(
        <div>
            {MoviesDiv}
            <div>
                <div class="modal fade" id="movieForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header border-bottom-0">
                                <h5 class="modal-title" id="exampleModalLabel">Movie Name</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div>
                                <form onSubmit={addGroup}>
                                    <div class="modal-body">
                                        <h1 id="title">Movie Name</h1>
                                        <h3 id="title">Overview</h3>
                                        <h3 id="title">Release Date</h3>
                                    </div>
                                    <div class="modal-footer border-top-0 d-flex justify-content-center">
                                        <button type="submit" class="btn btn-success">Submit</button>
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

export default MoviesList;
