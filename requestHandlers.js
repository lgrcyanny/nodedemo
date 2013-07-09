var exec = require('child_process').exec;
var querystring = require('querystring');
var fs = require('fs');
var formidable = require('formidable');

function start(request, response) {
  console.log('Request handler start was called.');

  var body = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" method="post" enctype="multipart/form-data">' +
    '<label>Your username: </label>' +
    '<input type="text" name="username"/><br/>' +
    '<input type="file" name="upload" /><br/>' +
    '<input type="submit" value="Submit" />' +
    '</form>' +
    '</body>' +
    '</html>';
  response.writeHead('200', {'Content-Type': 'text/html'});
  response.write(body);
  response.end();
}

function upload(request, response) {
  console.log('Request handler upload was called.');
  var form = new formidable.IncomingForm();
  form.encoding = 'utf8';
  form.parse(request, function(error, fields, files) {
    console.log('Form parse success!');
    fs.rename(files.upload.path, 'tmp/test.png', function(error) {
      if (error) {
        fs.unlink('tmp/test.png');
        fs.rename(files.upload.path, 'tmp/test.png');
      }
    });
    var username = fields.username;
    response.writeHead('200', {'Content-Type': 'text/html'});
    response.write('Congratulations! ' + username + ', upload succeed!\n' + '<img src="/show"/>');
    response.end();
  });
}

function show(request, response) {
  console.log('Request handler show was called.');
  fs.readFile('tmp/test.png', 'binary', function(error, file) {
    if (error) {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.write(error + '\n');
      response.end();
    } else {
      response.writeHead(200, {'Content-Type': 'image/png'});
      response.write(file, 'binary');
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;