/*Server.js defines all the routes of our application*/

'use strict';
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken'); // communicate between parties using json objects
const cors = require('cors'); /// handle resource sharing
const bodyParser = require('body-parser');
const data = require('./data');
const middleware = require('./middleware');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// list all products
app.get('/api/products', (req, res) =>
{
	return res.json(data.products);

});

// populate shopping cart
app.post('/api/products', (req, res)=>
{
	let products =[], id = null;
	// parse JSON cart data 
	let cart = JSON.parse(req.body.cart);
	// if cart is empty
	if(!cart) return res.json(products);
	// else if cart has 1 or more products in it
	for(var i = 0; i < data.products.length; i++)
	{
		id = data.products[i].id.toString();
		// check if cart contains items with ID
		if(cart.hasOwnProperty(id))
		{
			// index cart using ID to fetch quantity for product[i]
			data.products[i].qty = cart[id];
			// add whole product into array
			products.push(data.products[i]);
		}
	}
	return res.json(products);
});

// user sign in using simple auth
app.post('/api/auth', (req, res) =>
{
	// user will contain something if auth is successful
	let user = data.users.filter((user) => 
	{
    	return user.name == req.body.name && user.password == req.body.password;
  	});

  	if(user.length)
  	{
    	// create a token using user name and password vaild for 2 hours
    	let token_payload = {name: user[0].name, password: user[0].password};
    	let token = jwt.sign(token_payload, "jwt_secret_password", { expiresIn: '2h' });
    	let response = { message: 'Token Created, Authentication Successful!', token: token };
    	// return the information including token as JSON
    	return res.status(200).json(response);
	}
	else
	{
		return res.status("401").json("Authentication failed. admin not found.");
	}

});

//checkout route for signed in users

app.get('/api/pay', middleware, (req, res) => {

  return res.json("Payment Successful!");

});


const PORT = 5000;

app.listen(PORT);

console.log('api running on port ' + PORT + ': ');

