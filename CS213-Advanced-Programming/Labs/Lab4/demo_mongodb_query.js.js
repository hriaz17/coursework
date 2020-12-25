var MongoClient = require('mongodb').MongoClient;

var url2 = "mongodb://localhost:27017/";
MongoClient.connect(url2, function(err, db)
{
	if(err) throw err;
	var dbo = db.db("mydb");
	var query = { address: "Park Lane 38"};
	dbo.collection("customers").find(query, { projection: { _id: 0 } }).toArray(function(err, result)
	{
		if(err) throw err;
		console.log(result);
		db.close();

	});
	
});