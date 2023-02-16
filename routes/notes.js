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
    const { title, text, id } = req.body;
    if (title && text) {
        readAndAppend({
            title: title,
            text: text,
            id: (id) ? id : uuid(),
        }, db);
        res.status(201).json({ status: 'success' });
    } else {
        res.status(500).json('error posting feedback');
    }
});

notes.delete('/:note_id', (req, res) => {
    const { note_id } = req.params;
    if (note_id) {
        readAndDelete(note_id, db);
        res.status(201).json({ status: 'success' });
    } else {
        res.status(500).json('error posting feedback');
    }
});


module.exports = notes;
