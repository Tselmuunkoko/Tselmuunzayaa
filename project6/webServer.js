"use strict";

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var async = require('async');

// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require('./schema/user.js');
var Photo = require('./schema/photo.js');
var SchemaInfo = require('./schema/schemaInfo.js');

var express = require('express');
var app = express();

mongoose.connect('mongodb://localhost/cs142project6', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static(__dirname));

app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});
app.get('/test/:p1', function (request, response) {
    console.log('/test called with param1 = ', request.params.p1);

    var param = request.params.p1 || 'info';

    if (param === 'info') {
        SchemaInfo.find({}, function (err, info) {
            if (err) {
                console.error('Doing /user/info error:', err);
                response.status(500).send(JSON.stringify(err));
                return;
            }
            if (info.length === 0) {
                response.status(500).send('Missing SchemaInfo');
                return;
            }
            console.log('SchemaInfo', info[0]);
            response.end(JSON.stringify(info[0]));
        });
    } 
    else if (param === 'counts') {
        var collections = [
            {name: 'user', collection: User},
            {name: 'photo', collection: Photo},
            {name: 'schemaInfo', collection: SchemaInfo}
        ];
        async.each(collections, function (col, done_callback) {
            col.collection.countDocuments({}, function (err, count) {
                col.count = count;
                done_callback(err);
            });
        }, function (err) {
            if (err) {
                response.status(500).send(JSON.stringify(err));
            } else {
                var obj = {};
                for (var i = 0; i < collections.length; i++) {
                    obj[collections[i].name] = collections[i].count;
                }
                response.end(JSON.stringify(obj));

            }
        });
    } else {
        response.status(400).send('Bad param ' + param);
    }
});
app.get('/user/list', function (request, response) {
    User.find({},function(err,list){
        if (err) {
            console.error('Doing /user/list error:', err);
            response.status(500).send(JSON.stringify(err));
            return;
        }
        if (list.length === 0) {
            response.status(500).send('Missing SchemaInfo');
            return;
        }
        console.log('User', list);
        response.end(JSON.stringify(list));
    })
});
app.get('/user/:id', function (request, response) {
    var id = request.params.id;
    User.findById({_id:id},function(err,user){
        if (err) {
            console.error('Doing /user/:id error:', err);
            response.status(500).send(JSON.stringify(err));
            return;
        }
        if(user == null){
            console.log('User with _id:' + id + ' not found.');
            response.status(400).send('Not found');
        }
        console.log('User', user);
        response.end(JSON.stringify(user));
    })
});
app.get('/photosOfUser/:id', function (request, response) {
    var id = request.params.id;
    Photo.find({user_id:id},function(err,photos){
        if (err) {
            console.error('Doing /Photos/id error:', err);
            response.status(500).send(JSON.stringify(err));
            return;
        }
        if (photos.length === 0) {
            response.status(500).send('Missing SchemaInfo');
            return;
        }
        console.log('Photos', photos);
        response.end(JSON.stringify(photos));
    })
});

var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});


