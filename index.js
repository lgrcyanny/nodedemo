var server = require('./server');
var router = require('./router');
var reqeustHandlers = require('./requestHandlers');
var handle = {
  '/': reqeustHandlers.start,
  '/start': reqeustHandlers.start,
  '/upload': reqeustHandlers.upload,
  '/show': reqeustHandlers.show
};
server.start(router.route, handle);