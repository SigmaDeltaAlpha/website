let express = require('express')
let morgan 	= require('morgan')

let app 	= express()
let port 	= process.env.PORT || 3000


// middleware
app.use(express.static( __dirname + "/../client"));
app.use(express.static( __dirname + "/../node_modules/uikit/dist/css"));
app.use(express.static( __dirname + "/../node_modules/uikit/dist/js"));
app.use(express.static( __dirname + "/../node_modules/jquery/dist"));
app.use(morgan('dev'))

// more middleware
app.set('view engine', 'ejs')
app.set('views', __dirname + "/../client")

/*LANDING PAGE*/
app.get('/', function(req, res){
	if (req.isAuthenticated()){
		// we render the web app for bros
	}
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




app.listen(port, function(err){
	if (err){
		return console.log(err)
	}
	console.log("Server running on port", port)
})
