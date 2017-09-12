const 	express = require('express'),
	path = require('path'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers')
	pg = require('pg'),
	app = express(),
	passport = require('passport'),
	flash = require('connect-flash'),
	session = require('express-session'),
	expressValidator = require('express-validator'),
	LocalStrategy = require('passport-local');


// const port = process.env.PORT || 8080;

//DB connectString string - local

const connect = "postgress://jordanfalcon:11268955@localhost/blogposts";

//DB connectString string - production
// const connect = process.env.DATABASE_URL;
// pg.defaults.ssl = true;

pg.connect(connect, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});



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
	
// Express Sessions
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());
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
			return console.error('error running query', err);
		}
	res.render('blog', {blogposts: result.rows});
	});
	done();
	})
})



app.post('/<login></login>', function(req, res){
	pg.connect(connect, function(err, client, done){
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query("INSERT INTO blogposts(name, posts) VALUES($1, $2)", [req.body.name, req.body.posts]);
		done();
		res.redirect('/blog');
	});
});

// app.post('/login', function(req, res){
// 	pg.connect(connect, function(err, client, done){
// 		if(err) {
// 			return console.error('error fetching client from pool', err);
// 		}
// 		client.query("SELECT FROM user(username, password) VALUES($1, $2)", [req.body.username, req.body.password]);
// 		done();
// 		res.redirect('/blog');
// 	});
// });

app.delete('/delete/:id', function(req, res){
	pg.connect(connect, function(err, client, done){
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query("DELETE FROM blogposts WHERE blogpost_id = $1",
		[req.params.id]);
		done();
		res.send(200);
	});	
});

app.post('/edit', function(req, res){
	pg.connect(connect, function(err, client, done){
		if(err) {
			return console.error('error fetching client from pool', err);
		}
		client.query("UPDATE blogposts SET name = $1, posts = $2 WHERE blogpost_id = $3", 
			[req.body.name, req.body.posts, req.body.id]);
		done();
		res.redirect('/blog');
	});
});

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// Express Session

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

app.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });
module.exports = app; 	
