'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send("Hi I'm a chatbot");
});

app.get('/webhook/', function(req, res) {
    if (req.query['hub.verify_token'] === "juanfg") {
        res.send(req.query['hub.challenge']);
    }
    res.send("Wrong token");
}); 

app.listen(app.get.PORT, function() {
    console.log('App listening on port ' + app.get.PORT);
});