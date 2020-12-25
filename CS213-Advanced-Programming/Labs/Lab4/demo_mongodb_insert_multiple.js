var MongoClient = require('mongodb').MongoClient;

var url2 = "mongodb://localhost:27017/";
MongoClient.connect(url2, function(err, db)
{
	if(err) throw err;
	var dbo = db.db("mydb");
	// insert multiple records into 'customers'
	var myobj2 = [
	{name: "Sandy", address: "Ocean blvd 2"},
	{name: "Susan", address: "One way 98"},
	{name: "Vicky", address: "Yellow Garden 2"},
	{name: "William", address: "Central st 954"},
	{name: "Richard", address: "Sky st 331"},
	];
	dbo.collection("customers").insertMany(myobj2, function(err, res)
	{
		if(err) throw err;
		console.log("Multiple documents/records inserted....")
		console.log("Number of documents inserted: " + res.insertedCount);
	});
});