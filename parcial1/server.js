const express = require('express');
const path = require('path');

const app = express();

app.set('port', (process.env.PORT || 5000));

app.use('public', express.static(path.join(__dirname, '/public')));
app.use('assets', express.static(path.join(__dirname, '/assets')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/app.html'));
});

app.listen(app.get('port'), function() {
    console.log('Running on port ' + app.get('port'));
});