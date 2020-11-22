import React from 'react';

const app_name = 'cine-mates'
function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else {
        return 'http://localhost:5000/' + route;
    }
}

function Movie() {

    var _md = localStorage.getItem('movie_info');
    var md = JSON.parse(_md);

    return(
        <div>
            <div id="movieInfo">

            </div>
        </div>
   );
}

export default Movie;
