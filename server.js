var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var request = require('request');
var xml2js = require('xml2js');
var _ = require('lodash');
var config = require('./config');
var LastfmApi = require('lastfmapi');
var moment = require('moment');
var http = require('http');
var https = require('https');
var compress = require('compression');
var request = require('request');
var lastfm = new LastfmApi({
	api_key: config.lastfm.key,
	secret: config.lastfm.secret
});
var app = express();
var session = null;

// view engine setup
app.set('port', process.env.PORT || 3000);
app.use(compress())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname, {maxage : 86400000}));

// var songSchema = new mongoose.Schema({
// 	_id: Number,
// 	title: String,
// 	artist: String,
// 	album: String,
// 	albumArtist: String
// });

//var Song = mongoose.model('song', songSchema);

//mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/data/db');



app.get('/api/auth/:token', function (req, res, next) {
	if (req.params.token != 'undefined') {
		lastfm.authenticate(req.params.token, function (error, sess) {
			if (error) throw error;
			session = sess;
			console.log(session);
			return res.json(session);
		});
	}
});

app.get('/api/user/getusertopartists', function(req, res, next) {
	var user = req.headers.user;
	var str = '';
	var uri = encodeURI(config.lastfm.hostname + '?method=user.gettopartists&user=' + user + 
		'&api_key=' + config.lastfm.key + '&format=json');

	http.get(uri, function(response) {
		response.on('data', function(chunk) {
			str += chunk;
		});

		response.on('end', function() {
			ret = JSON.parse(str);
			console.log(ret);
			console.log(str);
			res.json(ret);
		});
	})
})

app.get('/api/user/getuserplays/:user', function(req, res, next) {
	var user = req.params.user;
	var str = '';
	var uri = encodeURI(config.lastfm.hostname + '?method=user.getrecenttracks&user=' + user + 
		'&api_key=' + config.lastfm.key + '&format=json');
	http.get(uri, function (response) {

			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				console.log(str);
				ret = JSON.parse(str);
				res.json(ret);
			});
		});
	console.log(user);
});

app.get('/api/albums/getalbuminfo/:collectionId', function(req, res, next) {
	var collectionId = req.params.collectionId;
	var str = '';
	var uri = encodeURI(config.itunes.hostname + 'lookup?id=' + collectionId + '&entity=song');
	https.get(uri, function (response) {

			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				ret = JSON.parse(str);
				ret.results.shift();
				var tracks = ret.results;
				res.json(tracks);
			});
		});
});

app.get('/api/getartistscrobbles', function(req, res, next) {
	var artist = req.params.artist;
	console.log(req);
	var user = {
		username: req.headers.username,
		key: req.headers.key
	}
	var str = '';
	lastfm.setSessionCredentials(user.username, user.key);
	lastfm.library.getArtists({
		'user': user.username,
		'limit': 99
	}, function(err, artists) {
		lastfm.setSessionCredentials(null, null);
		res.json(artists.artist);
	});
});

app.post('/api/scrobble', function (req, res, next) {
	var track = req.body;
	var status = { "success": false };
	console.log(track);
	var date = Math.floor((new Date()).getTime() / 1000) - 300;
	if (track.datePlayed) {
		var douche = track.datePlayed.slice(0, 10) + track.timePlayed.slice(10)
		date = Number(moment(douche).format('X'));
	}
	console.log(date);
	lastfm.setSessionCredentials(track.user.userName, track.user.key); //Horrible hack until I sort sessions with this api
	lastfm.track.scrobble({
		'artist': track.songArtist,
		'track': track.songTitle,
		'timestamp': date,
		'album': track.albumTitle

	}, function (err, scrobbles) {
		if (err) {
			return console.log('We\'re in trouble', err);
			lastfm.setSessionCredentials(null, null); //Horrible hack again
			return res.json(status.success);
		}

		console.log('We have just scrobbled:', scrobbles);
		status.success = true;
		lastfm.setSessionCredentials(null, null); //Horrible hack again
		return res.json(status.success);
	});
});

app.post('/api/searchalbum', function (req, res, next) {
	var albumDetails = req.body;
	var str = '';
	var ret;
	var uri = encodeURI(config.itunes.hostname + 'search?term=' + albumDetails.title +
		'&media=music&entity=album');
	https.get(uri, function (response) {

			response.on('data', function (chunk) {
				str += chunk;
			});
			response.on('end', function () {
				console.log(str);
				ret = JSON.parse(str);
				console.log(ret);
				res.json(ret);
			});
		});

});

//Need to return a success message somehow!
app.post('/api/scrobblealbum', function (req, res, next) {
	var user = {
		username: req.headers.username,
		key: req.headers.key
	}
	var status = { "success": false };
	var album = req.body;
	lastfm.setSessionCredentials(user.username, user.key); //Horrible hack again
	scrobbleAlbum(album.tracks);
	lastfm.setSessionCredentials(null, null); //Horrible hack again
	res.json(true);
});



app.get('*', function (req, res) {
	console.log("Hit this function again");
	res.sendFile(__dirname + '/index.html');
});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.send(500, { message: err.message });
});

app.get('/:token', function (req, res) {
	if (req.param.token) {
		console.log('We can see the token');
	}
	console.log("What is happening");
});

app.listen(app.get('port'), function () {
	console.log("Express server listening on port " + app.get('port'));
});

function scrobbleAlbum(tracks) {
	var success = false;
	var time = Math.floor((new Date()).getTime() / 1000) - 300;
	_.forEachRight(tracks, function (track) {
		console.log(track);
		time = track.date ? moment(track.date).format('X') : time -= Number(track.trackTimeMillis / 1000);
		console.log(time);
		lastfm.track.scrobble({
			'artist': track.artistName,
			'track': track.trackCensoredName,
			'timestamp': time,
			'album': track.collectionName

		}, function (err, scrobbles) {
			if (err) {
				return console.log('We\'re in trouble', err);
			}

			console.log('We have just scrobbled:', scrobbles);
			success = true;
		});
	});
}
