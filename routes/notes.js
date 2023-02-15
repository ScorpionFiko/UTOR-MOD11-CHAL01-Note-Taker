const notes = require('express').Router();
const fs = require('fs');
const util = require('util');
const db = './db/db.json';
const { readFromFile, readAndAppend, readAndDelete } = require('../utils/fsUtils');
const uuid = require('../utils/uuid');

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
    readFromFile(db)
        .then((data) => {
            res.status(201).json(JSON.parse(data));
        }).catch((err) => {
            res.status(500).json('error fetching data');
        });
});

// POST Route for submitting feedback
notes.post('/', (req, res) => {
    console.log(uuid);
    const { title, text } = req.body;
    if (title && text) {
        readAndAppend({
            title: title,
            text: text,
            id: uuid,
        }, db);
        res.status(201).json({ status: 'success' });
    } else {
        res.status(500).json('error posting feedback');
    }
});

notes.post('/:note_id', (req, res) => {

    res.send(`method: ${req.method}; path: ${req.path}; param: ${req.params.note_id}`)
});


module.exports = notes;
