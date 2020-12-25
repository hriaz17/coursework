// collection creation and collection manipulation url
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
MongoClient.connect(url, function(err, db)
{
	if(err) throw err;
	var dbo = db.db("mydb");
	// create collection 'customers'
	dbo.createCollection("customers", function(err, res)
	{
		if(err) throw err;
		console.log("Collection 'customers' created!");
	});

});