var express = require('express');
var prunner = require('./pythonRunner');
var crypto = require("crypto");
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

function randomNumber(size) {
    return crypto.randomBytes(size).toString('hex');
}

var code = 'name=input("name")\nage=input("age")\nprint name\nprint age';
var stdin = '"amr"\n"23"';
var path= "/home/amr/Desktop/python-int/temp/";
var file = 'script.py'
var folder = randomNumber(10);
myRunner = new prunner(path, folder, file, code, stdin);

app.post('/run', function(req, res) 
{

    myRunner.run(function(data)
    {
        res.send({output:data});
    });
   
});


app.get('/kill', function (req, res) 
{
    myRunner.killScript(function(data){
        res.send({output:data});
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});