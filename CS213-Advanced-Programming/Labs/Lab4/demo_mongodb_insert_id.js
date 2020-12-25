var MongoClient = require('mongodb').MongoClient;

var url2 = "mongodb://localhost:27017/";
MongoClient.connect(url2, function(err, db)
{
	if(err) throw err;
	var dbo = db.db("mydb");
	// create collection 'products'
	dbo.createCollection("products", function(err, res)
	{
		if(err) throw err;
		console.log("Collection 'products' created!");
	});
	// insert multiple records into 'customers'
	var myobj = [
    { _id: 154, name: 'Chocolate Heaven'},
    { _id: 155, name: 'Tasty Lemon'},
    { _id: 156, name: 'Vanilla Dream'}
  	];
	dbo.collection("products").insertMany(myobj, function(err, res)
	{
		if(err) throw err;
		console.log(res);
		db.close();

	});
	
});