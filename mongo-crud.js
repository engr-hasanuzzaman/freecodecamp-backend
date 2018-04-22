var mongo = require('mongodb').MongoClient;
var faker = require('faker');
var dbname = 'mongo_crud';
var cName = 'users';
var dbPath = 'mongodb://localhost:27017/';

mongo.connect(dbPath, function(err, client) {
    if(err) return console.log('database connection error');

    let db = client.db(dbname);
    let userCollection = db.collection(cName);

    // inset data if no data

    userCollection.count(function (err, n){
        if(err) console.log('---error during collection coult');
        console.log('---collection size is', n);
        if(n < 1){
            addMultipleData(userCollection, () =>{
                client.close();
            });
        }else{
            updateUser(userCollection, () => {
                console.log('----- after updating user ---');
                findByName(userCollection, 18, () =>{
                    removeUsers(userCollection, () => {
                      console.log('---- after remving user ---');
                      findByName(userCollection, 1, () =>{
                        client.close();
                      });
                    });
                });
            });
        }
    });


});

function addMultipleData(collection, callback){
    let users = [
        { name: 'sumon', age: 29, gender: 'm' },
        { name: 'salto', age: 18, gender: 'm' },
        { name: 'supto', age: 13, gender: 'm' },
        { name: 'pria', age: 7, gender: 'f' },
        { name: 'sumi', age: 31, gender: 'f' },
        { name: 'salma', age: 25, gender: 'f' },
        { name: 'Saiful', age: 23, gender: 'm' },
        { name: 'sarwar', age: 35, gender: 'm' },
        { name: 'shefali', age: 29, gender: 'f'}
    ];

    // make test data
    collection.insertMany(users, (err, result) => {
        if(err) return console.log('-- inserting data fail because of ', err);
        console.log('successfully data isert ', result.result.n);
        callback(result);
    });
}

function findByName(collection, age, callback){
    collection.find({ age: { $gt: age }})
        .toArray((err, users) => {
            if(err) return console.log(' ---- error finding user', err);

            console.log('---find users if ', users);
            callback(users);
        });
}

function updateUser(collection, callback){
    collection.updateOne({name: 'sumon'}, { $set: { new_prop: 'this is new' } }, (err, result) => {
        if(err) return console.log('error during update ', err);
        console.log('you have updated ', result.result);
        callback(result);
    });
}

function removeUsers(collection, callback){
  collection.deleteMany({ age: { $gt: 20 }}, (err, data) => {
    if(err) return console.log('--error deleting data');

    console.log('---deleting data success', data.result);
    callback(data);
  })
}
