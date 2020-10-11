var app = require("./app");
var applicationConstant = require("./applicationConstant");
var http = require("http");


var SERVER_PORT = applicationConstant.PORT;

var server = app.listen(SERVER_PORT,function(){
	var host = server.address().address;
  	var port = server.address().port;  	
  	console.log("Example app listening at http://%s:%s", host, port);
});

