var express = require("express"),
	bodyParser = require("body-parser"),
	app = express();

var todoRoutes = require("./routes/todo");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.get("/", function(req,res){
	res.sendFile("index.html");
})


app.use("/api/memo", todoRoutes);

app.listen(3000, function(){
	console.log("Running");
})