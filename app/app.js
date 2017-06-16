const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const dust = require('dustjs-helpers');
const pg = require('pg');
const app = express();
const port = process.env.PORT || 8080;
//DB connection string
const connect = "postgress://jordanfalcon:11268955@localhost/blogposts";

// Assign Dust engine to .dust file
app.engine('dust', cons.dust);

app.set('port', (process.env.Port || 8080));

// server
app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});

//set default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname+'/views');

//set Public folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/', function(req, res){
	
	res.render('index');
})


app.get('/index', function(req, res){
	
	res.render('index');
})

app.get('/gallery', function(req, res){
	
	res.render('gallery');
})

app.get('/contact', function(req, res){
	
	res.render('contact');
})


app.get('/blog', function(req, res){
	pg.connect(connect, function(err, client, done){
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * FROM blogposts', function(err, result){
		if (err){
			return console.error('error runniny query', err);
		}
	res.render('blog', {blogposts: result.rows});
	});
	done();
	})
})



app.post('/add', function(req, res){
	pg.connect(connect, function(err, client, done){
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query("INSERT INTO blogposts(name, posts) VALUES($1, $2)", [req.body.name, req.body.posts]);
		done();
		res.redirect('/blog');
	});
});

app.delete('/delete/:id', function(req, res){
	pg.connect(connect, function(err, client, done){
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query("DELETE FROM blogposts WHERE id = $1",
		[req.params.id]);
		done();
		res.redirect(200, '/blog');
	});
});

app.post('/edit', function(req, res){
	pg.connect(connect, function(err, client, done){
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query("UPDATE blogposts SET name = $1, posts = $2 WHERE id = $3", 
			[req.body.name, req.body.posts, req.body.id]);
		done();
		res.redirect('/blog');
	});
});

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app; 	