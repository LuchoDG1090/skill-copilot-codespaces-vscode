// Create web server
// Run on port 3000

// Importing modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

// Create an express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/commentos', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
app.get('/commentos', (req, res) => {
    Comment.find().then((comments) => {
        res.json(comments);
    });
});

app.post('/commentos', (req, res) => {
    const comment = new Comment({