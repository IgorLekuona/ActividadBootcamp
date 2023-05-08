const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;

const URL = 'mongodb://mongodb:27017';
const DB_NAME = 'mstr-fs';
const COLLECTION_NAME = 'master-fullstack';

const HOSTNAME = '0.0.0.0';
const PORT = 8080;

app.use(bodyParser.json());


//METHODS
const fetchAll = async (req, res) => {
    MongoClient.connect(URL, function(err, db) {
        if (err) throw err;
        const dbo = db.db(DB_NAME);
        dbo.collection(COLLECTION_NAME).find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log('Returning all characters from collection...')
            console.log(result);
            res.status(200).send(result);
            db.close();
        });
    });
}

const fetchQuery = async (req, res) => {
    MongoClient.connect(URL, function(err, db) {
        if (err) throw err;
        const dbo = db.db(DB_NAME);
        const query = { gender: 'Female', married_status: true };
        dbo.collection(COLLECTION_NAME).find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log('Returning all married female characters from collection...')
            console.log(result);
            res.status(200).send(result);
            db.close();
        });
    });
}

const updateQuery = async (req, res) => {
    MongoClient.connect(URL, function(err, db) {
        if (err) throw err;
        const dbo = db.db(DB_NAME);
        const query = { first_name: 'Alfonso' };
        const newValues = { $set: { first_name: 'Alfonsito'} };
        dbo.collection(COLLECTION_NAME).updateOne(query, newValues, function (err, res) {
            if (err) {
                console.log('No Alfonso found, inserting one');
                const entry = {
                    first_name: 'Alfonsito',
                    last_name: 'Delospalotes',
                    email: 'alfonsito@delospalotes.com',
                    gender: 'Male',
                    married_status: false
                };
                dbo.collection("customers").insertOne(entry, function(err, res) {
                    if (err) throw err;
                    console.log("Alfonsito inserted");
                    res.status(201).send("Alfonsito inserted");
                    db.close();
                });
            }
            console.log('Number of entries updated: ', res.result.nModified)
            res.status(200).send(res.result.nModified);
            db.close();
        });
    });
}

const deleteQuery = async (req, res) => {
    MongoClient.connect(URL, function(err, db) {
        if (err) throw err;
        const dbo = db.db(DB_NAME);
        const query = { gender: 'Female', married_status: true };
        dbo.collection(COLLECTION_NAME).deleteOne(query, function (err, obj) {
            if (err) res.status(201).send("Found no entry with specified characteristics");
            console.log('Deleted a married female character from collection...');
            res.status(200).send('Deleted a married female character from collection...');
            db.close();
        });
    });
}

//ROUTES

//GET all method
app.get('/fetchall', fetchAll);

//GET specific method
app.get('/query', fetchQuery);

//PUT method
app.put('/update', updateQuery);

//DELETE method
app.get('/delete', deleteQuery);


app.listen(PORT, HOSTNAME);
console.log(`Running on http://${HOSTNAME}:${PORT}`);
