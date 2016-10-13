var express = require('express');
var path = require('path');
var port = process.env.PORT || 8080;

var app = express();

// req.ip
// req.acceptsLanguages()
// req.headers['user-agent']

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'jade');

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/api/whoami', function(req, res){
    var lang = req.acceptsLanguages();
    var userAgent = req.headers['user-agent'];
    var os = userAgent.match(/\(([^)]+)\)/)[1];
    var ip = req.ip;
    
    res.json({
        ip: ip,
        language: lang[0],
        os: os
    });

});

var listener = app.listen(port);


module.exports = {app: app, listener: listener};
