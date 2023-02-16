const express = require('express');
const path = require('path');
const api = require('./routes/api.js');

const PORT = process.env.PORT || 3001;

const app = express();

// middleware including the router
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);
app.use(express.static('public'));

//routes
// /notes for the entry to the notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// /* for all other routes display the main index page
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
