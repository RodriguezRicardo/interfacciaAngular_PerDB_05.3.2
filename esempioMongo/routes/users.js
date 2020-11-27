var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient; 
const uri = 'mongodb+srv://ricardorodriguez:Rcy_kj0_p@nraboy-sample.bf8zs.mongodb.net/nraboy-sample?retryWrites=true&w=majority'

router.get('/', function (req, res, next) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getListMovies);
    
    function getListMovies(err) {
        if (err) console.log("Conessione al db non riuscita");
        else {
            const collection = client.db("sample_mflix").collection("movies"); 
            collection.find().limit(10).toArray(callBackQuery);
        }
    }
    function callBackQuery(err, result)  {
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }
});

//aggiunto metodo per vedere 5 film di genere horror
router.get('/horror', function (req, res, next) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getListMoviesHorror);
    
    function getListMoviesHorror(err) {
        if (err) console.log("Conessione al db non riuscita");
        else {
            const collection = client.db("sample_mflix").collection("movies"); 
            collection.find( {genres : {$in:["Horror"]}} ).limit(10).toArray(callBackQuery);
        }
    }
    function callBackQuery(err, result)  {
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }
});

//aggiunto metodo per vedere 10 film di genere thriller
router.get('/thriller', function (req, res, next) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(getListMoviesAction);
    
    function getListMoviesAction(err) {
        if (err) console.log("Conessione al db non riuscita");
        else {
            const collection = client.db("sample_mflix").collection("movies"); 
            collection.find( {genres:{$in:["Thriller"]}} ).limit(10).toArray(callBackQuery);
        }
    }
    function callBackQuery(err, result)  {
        if (err) console.log(err.message); 
        else res.send(result);
        client.close(); 
    }
});
module.exports = router;