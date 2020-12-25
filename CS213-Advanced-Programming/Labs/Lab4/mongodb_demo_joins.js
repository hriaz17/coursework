var MongoClient = require('mongodb').MongoClient;

var url2 = "mongodb://localhost:27017/";
MongoClient.connect(url2, function(err, db)
{
	if(err) throw err;
	var dbo = db.db("mydb");
	// automatically create and insert data in orders collection
	var myobj = { _id: 1, product_id: 154, status: 1 };
	dbo.collection("orders").insertOne(myobj, function(err, res)
	{
		if(err) throw err;
		console.log("Created and inserted 1 document(s) in orders collection.....");
	});

	dbo.collection('orders').aggregate([
    { $lookup:
       {
         from: 'products',
         localField: 'product_id',
         foreignField: '_id',
         as: 'orderdetails'
       }
     }
    ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});

