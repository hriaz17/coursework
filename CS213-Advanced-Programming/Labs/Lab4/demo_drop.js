var MongoClient = require('mongodb').MongoClient;

var url2 = "mongodb://localhost:27017/";
MongoClient.connect(url2, function(err, db)
{
	if(err) throw err;
	var dbo = db.db("mydb");
	dbo.collection("customers").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection 'customer' deleted");
    db.close();
  });
	
});