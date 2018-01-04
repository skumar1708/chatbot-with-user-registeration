require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
var config = require('config.json');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var chats = require('./chat');

app.use(express.static(path.join(__dirname, './public')));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.secret, resave: false, saveUninitialized: true }));

// use JWT auth to secure the api
app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.controller'));
app.use('/api/users', require('./controllers/api/users.controller'));

// make '/app' default route
app.get('/', function (req, res) {
    return res.redirect('/app');
});

// io.on('connection', function(socket){
//     console.log('a user connected');
//     socket.on('disconnect', function(){
//       console.log('user disconnected');
//     });
    // socket.on('chatMessage', function(from, msg){
    //      io.emit('chatMessage', from, msg);
    // });
    // socket.on('notifyUser', function(user){
    //     io.emit('notifyUser', user);
    // });

//     socket.on('bot chat message', function(from, msg){
//         io.emit('bot chat message', from, msg);
//    });
//   });
chats.load(io);
http.listen(3000, function(){
    console.log('listening on *:3000');
  });
// start server
// var server = app.listen(3000, function () {
//     console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
// });