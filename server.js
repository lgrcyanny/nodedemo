var http = require('http');
var url = require('url');
function start(route, handle) {
  function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log('Request %s was received.', pathname);
    //req.setEncoding('utf8');
    route(pathname, handle, req, res);
  }
  http.createServer(onRequest).listen('8888');
  console.log('Server started on http://localhost:8888');
}
exports.start = start;
