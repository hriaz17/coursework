var express = require('express');

var bodyParser = require('body-parser');

var app = express();

var mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/product_db'); 

app.set('view engine', 'pug');
app.set('views','./views');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res)
{
	res.render('first_view');

});

app.post('/handler', function (req, res) {
 const fname = req.body.firstname;
 const lname = req.body.lastname;
 console.log("Submitted User data:" + "\n" + "first name: " + fname + "\n" +  "last name: " + lname);
 res.send(req.body);
});


app.listen(5000);
