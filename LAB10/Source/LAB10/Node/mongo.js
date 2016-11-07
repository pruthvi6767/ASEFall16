/**
 * Created by user on 23/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
//var moulter=require('moulter')
var url = 'mongodb://pruthvi:pruthvi@ds051863.mlab.com:51863/rtbd';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/signup', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
})
var insertDocument = function(db, data, callback) {
    db.collection('lab10').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the lab10 collection.");
        callback();
    });
};


app.get('/login/:email', function(req,res){

    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        db.collection('lab10').findOne({email:req.params.email}, function(err,doc) {
            if (err) {
                handleError(res, err.message, "Failed to get contact");
            } else {
                res.status(200).json(doc);
                //console.log(res);
            }
        });
        });

        //getDocument(db, req.body, function() {
          //res.write("Successfully retrieved");
            //res.end();
        // });
    })

app.put('/login/:email&:newpw', function(req,res){

    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        db.collection('lab10').updateOne({email:req.params.email}, { $set: {password: req.params.newpw}}, function(err,doc) {
            if (err) {
                handleError(res, err.message, "Failed to get contact");
            } else {
                res.status(200).json(doc);
                //console.log(res);
            }
        });
    });

    //getDocument(db, req.body, function() {
    //res.write("Successfully retrieved");
    //res.end();
    // });
})

var mongoose = require('mongoose');
//var Grid = require('gridfs-stream');
var multer = require('multer');

app.post('/upload', multer({

    upload: null,// take uploading process

    onFileUploadStart: function (file) {
        //set upload with WritableStream
        this.upload = gfs.createWriteStream({
            filename: file.originalname,
            mode: "w",
            chunkSize: 1024*4,
            content_type: file.mimetype,
            root: "fs"
        });
    },

    onFileUploadData: function (file, data) {
        //put the chucks into db
        this.upload.write(data);
    },

    onFileUploadComplete: function (file) {
        //end process
        //this.upload.on('drain', function () {
            this.upload.end();
       // });
    }
}), function (req, res) {

    res.sendStatus(200);
});





var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})