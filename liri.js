require("dotenv").config();


var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: a766f967f4a0471aa3a6e256e1b4920e,
  secret: 5539952baf6143fd9a63bd5466e6bc24
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});

