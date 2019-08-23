// mongo singleton
var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017";
var url = "mongodb+srv://maxaquentin:fara9900@cluster1-gxbka.mongodb.net/test?retryWrites=true";
let result = null;

class Client {
    constructor (){
        return new Promise (async (resolve, reject) => {
            if(result == null){
                result = await MongoClient.connect(url, { useNewUrlParser: true, auto_reconnect: true })
            }
            resolve(await result)
        })  
    }
}
module.exports = Client;