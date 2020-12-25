var express = require('express');
var app = express();
var bodyParser = require('body-parser'); 
var multer = require('multer'); 
var path = require('path');
var session = require('express-session');
var alert = require('alert-node');
var fs = require('fs');
//var popupS = require('popups');


// Manage Auth
app.use(session(
	{	
		name: 'sid',
		resave: false,
		saveUninitialized: false,
		secret: 'ssh!quiet,it\'sasecret',
		cookie: {
			maxAge: 1000 * 60 * 60 * 2,
			sameSite: true,
		}
	}));

// Image uploading - store uploaded file on disk in public/images
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/');
  },
  // keep name of original file
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// create storage object
var upload = multer({ storage: storage });

// path to store uploaded images
app.use(express.static(path.join(__dirname, 'public')));

// for parsing url encoded form on GET request
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

//for parsing multipart/form-data on POST request 
//app.use(upload.array()); 

// set templating engine
app.set('view engine', 'pug');
app.set('views', './views');

// define database details

var mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost/shopping_db');

// create user schema
var userSchema = mongoose.Schema({ name: String, email: String, role: String, password: String }); 

// table 'users' object
var user = mongoose.model("user", userSchema); 

var productSchema = mongoose.Schema({ productid: Number, pname: String, imagename: String, price: Number, 
desc: String, rating: Number });


// table 'products' object
var product = mongoose.model("product", productSchema);

// function for checking if authentication response object is null or not 
function isEmptyObject(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}

// function for redirecting signed out users
const redirectLogin = (req, res, next) => {
	if(!req.session.email)
	{
		res.redirect("/");
	}
	else
	{
		next();
	}
}

/*if user is already logged in, redirect him to one of seller, buyer or admin pages
**else redirect to login/register page
**function to redirect already signed in users to main page*/
const redirectMain = (req, res, next) => {
	if(req.session.email) {
		res.redirect("/main");
	}
	else
	{
		next();
	}

}; 



// default route is login route
// put redirectMain here later
app.get("/", function(req, res)
{
	//const { email } = req.session;
	//console.log(email);
	res.render('login');

});

app.get("/signup", function(req, res)
{
	res.render('signup');

});


app.get("/reset", function(req, res)
{
	res.render('reset');

});

app.get("/buyer", redirectLogin, (req, res) =>
{

});

app.get("/seller", redirectLogin, (req, res) =>
{

});

app.get("/admin", redirectLogin, (req, res) =>
{

});

app.post("/", function(req, res)
{
	// do Auth
	const { email, password } = req.body;
	if(email && password) 
	{
		// check if user has entered correct email
		user.findOne({ email: email }, "email", function(err, response)
		{
			if(err) 
			{
				console.log(err);
			}
			else
			{
				// if user has NOT entered correct email/email not found
				if(isEmptyObject(response))
				{
					alert("Invalid email entered!");
					return res.redirect("/");
				}
				// check if user has entered correct password
				user.findOne({password: password}, "password", function(err, response)
				{
					if(err){
						console.log(err);
					}
					else
					{
						// if user has NOT entered correct password/ password not found
						if(isEmptyObject(response))
						{
							alert("Invalid password entered!");
							return res.redirect("/");
						}
						//If user exists in database, then find his role and name and put those into session object
						user.findOne({ email: email }, function(err, response)
						{
							if(err) console.log(err);
							else
							{
								req.session.email = email;
								req.session.username = response.name;
								console.log("User's name: " + response.name);
								req.session.role = response.role;
								console.log("User role: " + response.role);
								// generate product data for sellers
								if(req.session.role === "seller")
								{
									product.find({}, function(err, response)
									{
										if(err) console.log(err);
										else 
										{
											console.log("Now we rendering sella!");
											// redirect user to sellers based on his session variable info
											res.render("seller", {
											name: req.session.username,
											products: response
											});
										}
									});

								}
								if(req.session.role === "buyer")
								{
									product.find({}, function(err, response)
									{
										if(err) console.log(err);
										else 
										{
											console.log("Now we rendering buya!");
											// redirect user to buyers based on his session variable info
											res.render("buyer", {
											name: req.session.username,
											products: response
											});
										}
									});
								}
								if(req.session.role === "admin")
								{
									user.find({}, function(err, response)
									{
										if(err) console.log(err);
										else
										{
											console.log("We rendering admin!");
											// redirect user to admin based on his session variable info
											res.render('admin',
											{
												name: req.session.username,
												users: response

											});
										res.end();
										}

									});
								}
							}

						});

					}

				});
			}
		});

	}
});

// signing up route

app.post("/signup", function(req, res)
{
	var userInfo = req.body;

	//Get the parsed information 
	if(!userInfo.name || !userInfo.email || !userInfo.role || !userInfo.password)
	{ 
		res.render('show_message', { message: "Sorry, you are missing some info!", type: "error"}); 
	} 
	else 
	{ 
		var newUser = new user({ name: userInfo.name, email: userInfo.email,
		role: userInfo.role, password: userInfo.password }); 
		newUser.save(function(err, user){ 
		if(err) res.render('show_message', {message: "Database error", type: "error"}); 
		else res.render('show_message', { message: "New User added succesfully to Database", type: "success", user: userInfo});
		}); 
	}
});

// adding new products 
app.post("/insertProduct", upload.single('fileToUpload'), function(req, res)
{
	var productInfo = req.body;
	if(!productInfo.productid || !productInfo.pname || !productInfo.price || !productInfo.desc || !productInfo.rating )
	{ 
		console.log('Some Product Information was missing in the form submitted!');
	}
	var imageFile = req.file.path.replace(/^public\//, '');
	console.log(imageFile + " uploaded successsfully!");
	var newProduct = new product({ productid: productInfo.productid, pname: productInfo.pname, imagename: imageFile, price: productInfo.price, 
	desc: productInfo.desc, rating: productInfo.rating });
	newProduct.save(function(err, handler)
	{ 
		if(err) res.render('show_message', {message: "Database error", type: "error"}); 
		else 
		{
			console.log('Product insertion successful!');
			product.find({}, function(err, response)
			{
				if(err) console.log(err);
				else 
				{
					res.render('seller', 
					{
						name: req.session.username,
						products: response

					});
					res.end();				
				}
			});
		}
	}); 
});




// update a product

app.post("/changeProduct", upload.single("fileToUpload"), function(req, res)
{
	var productInfo = req.body;

	if(!productInfo.productid || !productInfo.pname || !productInfo.price || !productInfo.desc || !productInfo.rating )
	{ 
		console.log('Update set some product info as blank!');
	}
	var imageFile = req.file.path.replace(/^public\//, '');
	console.log(imageFile + " updated successsfully!");
	product.findOneAndUpdate({productid:productInfo.productid}, { productid: productInfo.productid, pname: productInfo.pname, imagename: imageFile, price: productInfo.price, 
	desc: productInfo.desc, rating: productInfo.rating }, function(err, response)
	{
		if(err) console.log(err);
		else
		{
			console.log("Product Update complete!");
		}

	});	
});
/*
app.post("/changeProduct", function(req, res)
{
	var product_id = req.body.productid;
	console.log("Product ID: " + product_id);
	// fetch product using this id and update it's info
	product.findOne({ productid: product_id }, function(err, response)
	{
		if(err) console.log(err);
		else
		{
			if(!response)
			{
				alert("Invalid update parameters passed!");
				// refresh sellers page to show products list again
				product.find({}, function(err, response)
				{
					if(err) console.log(err);
					else 
					{
						res.render('seller', 
						{
							name: req.session.username,
							products: response

						});
						res.end();				
					}
				});
			}
			else
			{
				
					response.pname = req.body.pname;
				}
				// update product price
				if(req.body.price)
				{
					response.price = req.body.price;
				}
				// update product description
				if(req.body.desc)
				{
					response.desc = req.body.desc;
				}
				// update product ID
				if(req.body.rating)
				{
					response.rating = req.body.rating;
				}

				response.save(function(err, updatedObject)
				{
					if(err) console.log(err);
					else
					{
						console.log('Product update successful!');
						// refresh sellers page to show updated products list
						product.find({}, function(err, response)
						{
							if(err) console.log(err);
							else 
							{
								res.render('seller', 
								{
									name: req.session.username,
									products: response

								});
								res.end();				
							}
						});

					}

				});
			}
		}

	});

});*/



// delete a product
app.post("/deleteProduct", function(req, res)
{
	var product_id = req.body.productid;
	console.log("Product ID to be deleted: " + product_id);
	// fetch product using this id and update it's info
	product.findOneAndRemove({ productid: product_id }, function(err, response)
	{
		if(err) console.log(err);
		else
		{
			console.log("Product deleted succesfully!");
			// refresh sellers page to show updated products list
			product.find({}, function(err, response)
			{
				if(err) console.log(err);
				else 
				{
					res.render('seller', 
					{
						name: req.session.username,
						products: response

					});
					res.end();				
				}
			});
			
		}

	});
});

// change role of user to buyer
app.post("/setBuyer", function(req, res)
{
	var emailID = req.body.email;
	console.log("User to be modified: " + emailID);
	user.findOneAndUpdate({email: emailID}, {role: "buyer"}, function(err, response)
	{
		if(err) console.log(err);
		else
		{
			// refreshing admin page with updated users data
			user.find({}, function(err, response)
			{
				if(err) console.log(err);
				else
				{
					// redirect user to admin based on his session variable info
					res.render('admin',
					{
						name: req.session.username,
						users: response

					});
					res.end();
				}

			});
		}
	});

});

// change role of user to seller
app.post("/setSeller", function(req, res)
{
	var emailID = req.body.email;
	console.log("User to be modified: " + emailID);
	user.findOneAndUpdate({email: emailID}, {role: "seller"}, function(err, response)
	{
		if(err) console.log(err);
		else
		{
			// refreshing admin page with updated users data
			user.find({}, function(err, response)
			{
				if(err) console.log(err);
				else
				{
					// redirect user to admin based on his session variable info
					res.render('admin',
					{
						name: req.session.username,
						users: response

					});
					res.end();
				}

			});
		}
	});

});

// change role of user to admin
app.post("/setAdmin", function(req, res)
{
	var emailID = req.body.email;
	console.log("User to be modified: " + emailID);
	user.findOneAndUpdate({email: emailID}, {role: "admin"}, function(err, response)
	{
		if(err) console.log(err);
		else
		{
			// refreshing admin page with updated users data
			user.find({}, function(err, response)
			{
				if(err) console.log(err);
				else
				{
					// redirect user to admin based on his session variable info
					res.render('admin',
					{
						name: req.session.username,
						users: response

					});
					res.end();
				}

			});
		}
	});

});



app.post("/logout", redirectLogin, function(req, res)
{
	req.session.destroy(err => {
		return res.redirect("/");
	});
	res.clearCookie("sid");
});



app.listen(8080);
console.log("App listening on port 8080");