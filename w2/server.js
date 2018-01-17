const express = require('express');
const path = require('path');

const app = express();

app.set('port', (process.env.PORT || 3000));

app.use("/public", express.static(__dirname + "/public"));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/maps.html')); 
});

app.listen(app.get('port'), function() {
    console.log("Running on port " + app.get('port'));
});