var express = require("express")
var fs = require("fs")

var app = express();

var quiz = JSON.parse(fs.readFileSync("quiz.json"));

app.set("port", (process.env.PORT || 8080)) /* used to be 5000 */
app.use(express.static(__dirname + "/public"))

app.get("/", function(request, response) {
	buffer = new Buffer(fs.readFileSync("index.html"))
	response.send(buffer.toString("utf8"))
})

app.listen(app.get("port"), function() {
	console.log("Node app is running at localhost:" + app.get("port"))
})