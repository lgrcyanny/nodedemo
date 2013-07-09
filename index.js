var server = require('./server');
var router = require('./router');
var reqeustHandlers = require('./requestHandlers');
var handle = {
  '/': reqeustHandlers.start,
  '/start': reqeustHandlers.start,
  '/upload': reqeustHandlers.upload
};
server.start(router.route, handle);