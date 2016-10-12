var assert = require('assert');

var server = require('./server.js');

var supertest = require('supertest');

describe('app', function() {
    it('app should exist', function() {
        assert(server.app);
    });

    it('should listen at a default port if none set', function() {
        delete process.env.PORT;
        delete require.cache[require.resolve('./server.js')];
        server = require('./server.js');
        assert.equal(server.listener.address().port, 8080);
    });

    it('should listen on PORT if set', function() {
        process.env.PORT = 9000;
        delete require.cache[require.resolve('./server.js')];
        server = require('./server.js');
        assert.equal(server.listener.address().port, process.env.PORT);
    });

    it('should serve a page from /api/whoami', function(done) {
        server.app.enable('trust proxy');
        supertest(server.app)  
            .get('/api/whoami')
            .set('Accept-Language', 'en-GB')
            .set('User-Agent', 'Mozilla/5.0 (X11; CrOS x86_64 8743.57.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.51 Safari/537.36')
            .set('X-Forwarded-For', '78.250.141.48') 
            .expect(200, {
                ip: '78.250.141.48',
                language: 'en-GB',
                os: 'X11; CrOS x86_64 8743.57.0'
            })
            .expect('Content-Type', /json/, done)
    });

});

    

