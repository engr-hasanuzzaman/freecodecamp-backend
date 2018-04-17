var mongo = require('mongodb').MongoClient;
var dbname = 'learnyoumongo';
var age = parseInt(process.argv[2]);
var dbPath = 'mongodb://localhost:27017/';

mongo.connect(dbPath, function(err, client) {
  if(err) return console.log('database connection error');

    let db = client.db(dbname);
    let parrots = db.collection('parrots');
    parrots.find({
        age: {
            $gt: age
        }
    }).toArray((err, docs) => {
        console.log(docs);
        client.close();
    });
});