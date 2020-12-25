var MongoClient = require('mongodb').MongoClient;
// database creation url
var url = "mongodb://localhost:27017/mydb";

// create database
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database 'mydb' created!");
  db.close();
});