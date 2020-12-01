var express = require('express');
var app = express();
var bodyParser = require('body-parser');

function getHandler(req, res){
res.send('Welcome Express GET');
}

function postHandler(req, res){
console.log(req.body);
res.send('Receive POST ' + req.body.message);
}

app.use(bodyParser.urlencoded({
extended:true
}));
app.use(bodyParser.json());

app.get('/',getHandler);
app.post('/', postHandler);
app.listen(3000);
console.log('Server running at http://localhost:3000');