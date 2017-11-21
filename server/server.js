let express 		= require('express')
let morgan 			= require('morgan')
let cookieParser 	= require('cookie-parser');
let bodyParser   	= require('body-parser');
let session      	= require('express-session');
let mongoose 		= require('mongoose')
let passport 		= require('passport')
let favicon 		= require('serve-favicon')

let app 			= express()
let port 			= process.env.PORT || 8091
let url 			= require( __dirname + '/config/config.js').url


// middleware for static assets
app.use(express.static( __dirname + "/../client"));
app.use(express.static( __dirname + "/../node_modules/uikit/dist/css"));
app.use(express.static( __dirname + "/../node_modules/uikit/dist/js"));
app.use(express.static( __dirname + "/../node_modules/jquery/dist"));

// serve the favicon with every request
app.use(favicon( __dirname + '/../client/assets/favicon.ico'))


// middleware for handling sessions
app.use(morgan('dev'))
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json({
	extended : true
})); // get information from html forms

// middleware for session managment within passport
app.use(session({
	secret				: 'ilovescotchscotchyscotchscotch',
	resave 				: true,
	saveUninitialized 	: true

})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// configure passport
require( __dirname + '/config/passport')(passport)

// middleware for rendering views
app.set('view engine', 'ejs')
app.set('views', __dirname + "/../client")


/*connect to database*/
mongoose.connect(url, function(err){
	if (err){
		return console.log(err)
	}
	return console.log('connected to database')
})




/*LANDING PAGE*/
app.get('/', function(req, res){

	/*
	if (req.isAuthenticated()){
		// we render the web app for bros
	}

	*/
	return res.render('views/index', {})
})
/*ABOUT PAGE*/
app.get('/about', function(req, res){
	res.render('views/about', {})
})
/*CONTACT PAGE*/
app.get('/contact', function(req, res){
	res.render('views/contact', {})
})
app.post('/contact', function(req, res){
	// here we handle the contact request
})
/*BROTHERS PAGE*/
app.get('/brothers', function(req, res){
	res.render('views/brothers', {})
})
/*FOR RECRUITING NIGGAS*/
app.get('/join', function(req, res){
	res.render('views/join', {})
})
app.post('/join', function(req, res){
	// here we save all the data that was sent to us and contact the potential
	// interets later
})



/*THIS IS FOR THE HIDEDN/BROTHERS ONLY PART***/
app.get('/login', function(req,res){
	if (req.isAuthenticated()){
		return res.redirect('/')
	}
	res.render('views/login', {})
})

app.post('/login', function(req, res, next){
	if(req.isAuthenticated()){
		return res.redirect('/') // is alredy logged in
	}
	return next() // not logged in
}, passport.authenticate('local-login', {
	successRedirect : '/profile', // redirect to the secure profile section
	failureRedirect : '/login', // redirect back to the signup page if there is an error
	failureFlash 	: true // allow flash messages
}));


app.post('/createuser', function(req, res, next){
	if (req.isAuthenticated() && req.user.isAdmin){
		return next() // only admins can create users
	}
	return res.redirect('/') // if not an admin, then go away fam
}, passport.authenticate('local-signup', {
	successRedirect : '/profile',
	failureRedirect : '/failure',
	failureFlash 	: true
}))



/*this is for handling webhooks from anyone*/
app.post('/webhooks/:id', function(req, res){
	if (req.params.id == "typeform"){

		res.json({
			nice : 'nice'
		})

		console.log(req.body)

	}
})




app.listen(port, function(err){
	if (err){
		return console.log(err)
	}
	console.log("Server running on port", port)
})
