var MongoClient = require('mongodb').MongoClient;

var url2 = "mongodb://localhost:27017/";
MongoClient.connect(url2, function(err, db)
{
	if(err) throw err;
	var dbo = db.db("mydb");
	dbo.collection("customers").find().limit(5).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
	});

});

