var MongoClient = require('mongodb').MongoClient;

var url2 = "mongodb://localhost:27017/";
MongoClient.connect(url2, function(err, db)
{
	if(err) throw err;
	var dbo = db.db("mydb");
	// insert one record/document into 'customers'
	var myobj = {name: "Company Inc", address: "Highway 37"};
	dbo.collection("customers").insertOne(myobj, function(err, res)
	{
		if(err) throw err;
		console.log("1 document/record inserted into table 'customers'");
	});
});