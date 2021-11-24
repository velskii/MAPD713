var SERVER_NAME = 'user-api'
var PORT = process.env.PORT;


var restify = require('restify')

  , usersSave = require('save')('users')

  , server = restify.createServer({ name: SERVER_NAME})

  server.listen(PORT, function () {
  console.log('Server %s listening at %s', server.name, server.url)
})

server
  .use(restify.fullResponse())
  .use(restify.bodyParser())

  server.get('/users', function (req, res, next) {
    usersSave.find({}, function (error, users) {
      res.send(users)
    })
  })


