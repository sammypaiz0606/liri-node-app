require("dotenv").config();

const keys = require('./keys.js')
const Spotify = require('node-spotify-api')
const omdb = require('omdb');
const request = require('request');
const fs = require('fs')

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

function movie_this(input) {
    var movie;
    if (input === "") {
        movie = 'Mr Nobody';
    } else {
        movie = input;
    }
    request('http://www.omdbapi.com/?i=tt3896198&apikey=b25eb0d4=' + movie, function (error, response, body) {
        let movieData = JSON.parse(body);
        console.log(error, response.statusCode);
        if (!error && response.statusCode == 200 && movieData.Response == "True") {
            const filterer = (rating) => rating.Source == "Rotten Tomatoes";
            // console.log(movieData);
            let {
                Title,
                Year,
                Rated,
                Country,
                Language,
                Plot,
                Actors
            } = movieData
            console.log(Title)
            console.log(Year)
            console.log(Rated)
            console.log(movieData.Ratings.filter(filterer)[0].Value)
            console.log(Country)
            console.log(Language)
            console.log(Plot)
            console.log(Actors)
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