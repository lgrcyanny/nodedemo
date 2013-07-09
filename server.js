var http = require('http');
var url = require('url');
function start(route, handle) {
  function onRequest(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log('Request %s was received.', pathname);

    var postData = '';
    req.setEncoding('utf8');
    req
      .on('data', function(postDataChuck) {
        postData += postDataChuck;
        console.log('Post Data ' + postDataChuck + ' was received.');
      })
      .on('end', function() {
        route(pathname, handle, res, postData);
      });
  }
  http.createServer(onRequest).listen('8888');
  console.log('Server started on http://localhost:8888');
}
exports.start = start;
