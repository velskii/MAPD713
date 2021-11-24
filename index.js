var SERVER_NAME = 'test-api'
var PORT = 80;


var restify = require('restify')
  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, function () {
  console.log('Server %s listening at %s', server.name, server.url)
})

server
  .use(restify.fullResponse())
  .use(restify.bodyParser())

  server.get('/', function (req, res, next) {
    res.send(JSON.stringify({info:success, code:200}))
  })

  server.get('/index', function (req, res, next) {
    res.send(JSON.stringify({info:success, code:200}))
  })


