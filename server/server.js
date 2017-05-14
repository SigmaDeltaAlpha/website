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

app.get('/', function(req, res){
	res.render('index')
})

app.listen(port, function(err){
	if (err){
		return console.log(err)
	}
	console.log("Server running on port", port)
})
