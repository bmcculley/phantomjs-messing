// Do things like:
var fs = require('fs');
var Handlebars = require('./jquery-1.12.4.min.js');
var Routes = require('./Routes.js');

var app = new Routes();

app.use(Routes.static('../htdocs'));

app.use(function(req, res, next) {
	req.startTime = new Date().getTime();
	next();
});

app.all(/.+/, function(req, res, next) {
	console.log('Here comes a request.');
	next();
});

app.get('/', function(req, res, next) {
	res.send('Hello there.');
})

app.post('/', function(req, res, next) {
	res.send(req.post.name);
});

app.get('/test', function(req, res, next) {
	res.write('What a test.');
	next();
});

app.get('/user/([a-zA-Z0-9]+)', function(req, res, next) {
	res.write('You are user: ' + req.params[0]);
	next();
});

app.get('/nonexistent', function(req, res) {
	res.send(404);
});

app.get('/go_away', function(req, res) {
	res.redirect('/');
});

app.get('/hello', function(req, res, next) {
	var hello_world = {'hello':'Hello, world!'};
	var html_out = fs.read('templates/main.html');
	res.write(html_out);
	next();
});

app.use(function(req, res) {
	console.log(new Date().getTime() - req.startTime);
	res.close();
});

app.listen(8000);
