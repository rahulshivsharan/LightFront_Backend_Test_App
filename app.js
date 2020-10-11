var express = require("express");
var app = express();
var request = require("request");
var cors = require("cors");
var applicationConstant = require("./applicationConstant");



app.get("/hi",cors(),function(req,resp,next){
	var obj = {
		"message" : "Hi, wellcome to stock services"
	}
	resp.json(obj);
});

// get Organisation Units
app.get("/stock/list/:name",cors(),function(req,res){	
	var END_POINT = "https://api.polygon.io/v2/reference/tickers/?apiKey=UdnNMdcOVPI5MG2SE3OZIQbkxqrIx5s1&market=stocks&locale=us&search="+req.params.name;
	//console.log("Lets start "+req.params.name);
	try{
		request({
			url : END_POINT,
			method : "GET"			
		},function(error,response){			
			if(error){
				console.log(error);
				throw "Error in getStockList service";
			}else{
				var responseText = response["body"];								
				var responseObj = JSON.parse(responseText);
				res.status(200);
				res.set("Content-Type","application/json");				
				res.send(responseObj);			
			}
		
			res.end();	
		});

	}catch(err){
		res.json(err);
	}
});	

app.get("/stock/range/:stockCode",cors(),function(req,res){	
	var END_POINT = "https://api.polygon.io/v2/aggs/ticker/"+req.params.stockCode+"/range/1/day/2019-06-01/2020-06-17?apiKey="+applicationConstant.API_KEY;
	try{
		request({
			url : END_POINT,
			method : "GET"			
		},function(error,response){			
			if(error){
				console.log(error);
				throw "Error in getStockInfo service";
			}else{
				var responseText = response["body"];								
				var responseObj = JSON.parse(responseText);
				res.status(200);
				res.set("Content-Type","application/json");				
				res.send(responseObj);			
			}
		
			res.end();	
		});

	}catch(err){
		res.json(err);
	}
});

app.get("/stock/info/:stockCode",cors(),function(req,res){	
	var END_POINT = "https://api.polygon.io/v1/meta/symbols/"+req.params.stockCode+"/company/?apiKey="+applicationConstant.API_KEY;
	try{
		request({
			url : END_POINT,
			method : "GET"			
		},function(error,response){			
			if(error){
				console.log(error);
				throw "Error in getStockInfo service";
			}else{
				var responseText = response["body"];								
				var responseObj = JSON.parse(responseText);
				res.status(200);
				res.set("Content-Type","application/json");				
				res.send(responseObj);			
			}
		
			res.end();	
		});

	}catch(err){
		res.json(err);
	}
});

module.exports = app;