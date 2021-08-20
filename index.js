var express = require('express');
//var app = require('express')();
//var http = require('http').Server(app);
var service = require('./lib/service.js');

var app = express();

// body parser middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.listen(3003,function(){
    console.log('Server started on port 3003...');
    //service.GetPortfolios();
    service.AddPortfolio('PortfolioFCA');
    //service.DeletePortfolio('Portfolio01');
})