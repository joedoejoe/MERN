const express = require('express');
const { FindCursor, CURSOR_FLAGS } = require('mongodb');

// recordRoutes is an instance of the express router
// we use it to define our routes
// the router will be added as a middleware and will take control of requests starting with path /record
const recordRoutes = express.Router();

// this will help us connect to the database
const dbo = require('../db/conn');

// this section will help you get a list of all the records
recordRoutes.route('/record').get(function (req, res) {
    let db_connect = dbo.getDb('employees');
    db_connect
        .collection('records')
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// this section will help you create a new record
recordRoutes.route('/record/add').post(function (req, res) {
    let db_connect = dbo.getDb('employees');
    let myObj = {
        person_name: req.body.person_name,
        person_position: req.body.person_position,
        person_level: req.body.person_level,
    };
    db_connect.collection("records").insertOne(myObj, function (err, res) {
        if (err) throw err;
    });
});

// this section will help you update a record by id
recordRoutes.route('/update/:id').post(function (req, res) {
    let db_connect = dbo.getDb('employees');
    let myQuery = { id: req.body.id };
    let newValues = {
        $set: {
            person_name: req.body.person_name,
            person_position: req.body.person_position,
            person_level: req.body.person_level,
        },
    };
    db_connect.collection('records').updateOne(myQuery, newValues, function (err, res) {
        if (err) throw err;
        console.log('1 document updated');
    });
});

// this section will help you delete a record
recordRoutes.route('/:id').delete((req, res) => {
    let db_connect = dbo.getDb('employees');
    var myQuery = { id: req.body.id };
    db_connect.collection('records').deleteOne(myQuery, function (err, res) {
        if (err) throw err;
        console.log('1 document deleted');
    });
});

module.exports = recordRoutes;