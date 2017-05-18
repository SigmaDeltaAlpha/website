let express 		= require('express')
let morgan 			= require('morgan')
let cookieParser 	= require('cookie-parser');
let bodyParser   	= require('body-parser');
let session      	= require('express-session');
let mongoose 		= require('mongoose')
let passport 		= require('passport')

let app 			= express()
let port 			= process.env.PORT || 8091
let url 			= require( __dirname + '/config.js').url


// middleware for static assets
app.use(express.static( __dirname + "/../client"));
app.use(express.static( __dirname + "/../node_modules/uikit/dist/css"));
app.use(express.static( __dirname + "/../node_modules/uikit/dist/js"));
app.use(express.static( __dirname + "/../node_modules/jquery/dist"));

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


// middleware for rendering views
app.set('view engine', 'ejs')
app.set('views', __dirname + "/../client")


/*connect to database*/
mongoose.connect(url, function(err){
	if (err){
		return console.log(err)
	}
	console.log('connected to database')
})




/*LANDING PAGE*/
app.get('/', function(req, res){

	/*
	if (req.isAuthenticated()){
		// we render the web app for bros
	}

	*/
	res.render('views/index', {})
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

})


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
