const express = require('express');

// Import our router for /notes
const notesRouter = require('./notes.js');

const api = express();
api.use('/notes', notesRouter);


module.exports = api;