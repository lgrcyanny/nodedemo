function route(pathname, handle, response, postData) {
  console.log("Request %s was router.", pathname);
  if (typeof handle[pathname] === 'function' ) {
    handle[pathname](response, postData);
  } else {
    console.log('No request handle for %s', 'pathname');
    response.writeHead('404', {'Content-Type': 'text/plain'});
    response.write('404 Not Found!');
    response.end();
  }
}
exports.route = route;