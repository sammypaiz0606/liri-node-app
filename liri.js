require("dotenv").config();

const keys = require('./keys.js')
const Spotify = require('node-spotify-api')
const request = require('request');
const omdb = require('omdb');
const fs = require('fs');

const spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

let [one, two, command, ...input] = process.argv;
console.log(command);

input = input.join(" ")

switch (command) {
   
    case "spotify-this-song":
        console.log("this song rocks!")
        spotify_this(input);
        break
    case "movie-this":
        console.log("Love this movie!")
        movie_this(input);
        break
    case "do-what-it-says":
        console.log("do the chicken dance!")
        grabText();
        break
}



function spotify_this(input) {
    var song;
    if (input === "") {
        song = 'The Sign Ace of Base';
    } else {
        song = input;
    }
    spotify.search({
        type: 'track',
        query: song
    }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log(data.tracks.items[0].album.artists[0].name)
        console.log(data.tracks.items[0].name)
        console.log(data.tracks.items[0].external_urls.spotify)
        console.log(data.tracks.items[0].album.name)
    });
};


function movie_this(inputs) {

    var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=b25eb0d4";

    request(queryUrl, function(error, response, body) {
        if (!inputs){
            inputs = 'Mr Nobody';
        }
        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
};


function grabText() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var song = data.split(",")[1];
        spotify_this(song);
    })
}