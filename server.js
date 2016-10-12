var express = require('express');
var port = process.env.PORT || 8080;

var app = express();

// req.ip
// req.acceptsLanguages()
// req.headers['user-agent']


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
