const express = require('express');
const path = require('path');

const app = express();

app.set("port", (process.env.PORT || 8080));

app.use("/public", express.static(path.join(__dirname + "/public")));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/shoppingcar.html'));
});

app.listen(app.get("port"), function(){
	console.log("listening on port " + app.get("port"));
});
