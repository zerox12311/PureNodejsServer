var http = require('http');
var querystring = require('querystring');

http.createServer((request, response) => {
    console.log('request', request.url);
    switch (request.url) {
        case '/api/account':
            switch (request.method) {
                case 'GET':
                    response.writeHead(200);
                    response.write('GET');
                    response.end();
                    break;
                case 'POST':
                    request.setEncoding('utf-8');
                    var postData = '';
                    request.addListener("data", function (postDataChunk) {
                        postData += postDataChunk;
                    });
                    request.addListener("end", function () {
                        var params = querystring.parse(postData);
                        console.log(params);
                        response.writeHead(200, { 'Content-Type': 'text/plain' });
                        response.end('Hello World\n');
                    });
                    break;
            }
            break;
        case '/api/password':
            response.writeHead(200);
            response.write('Password is good')
            response.end();
            break;
        default:
            response.writeHead(200);
            response.end('Server is good', 'utf-8');
    }

}).listen(3001);
console.log('Server running at http://127.0.0.1:3001');