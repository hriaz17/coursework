var MongoClient = require('mongodb').MongoClient;

var url2 = "mongodb://localhost:27017/";
MongoClient.connect(url2, function(err, db)
{
	if(err) throw err;
	var dbo = db.db("mydb");
	var mysort = {name : 1};
	dbo.collection("customers").find({}, { projection: { _id: 0 } }).sort(mysort).toArray(function(err, result)
	{
		if(err) throw err;
		console.log(result);
		db.close();

	});
	
});