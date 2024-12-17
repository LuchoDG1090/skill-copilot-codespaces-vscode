// Create web server with express.js
// Create a route that gets the comments
// Create a route that posts the comments
// Create a route that puts the comments
// Create a route that deletes the comments

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const comments = require('./data/comments');

app.use(bodyParser.json());

// Get comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Post comments
app.post('/comments', (req, res) => {
    const { body } = req;
    comments.push(body);
    fs.writeFileSync('./data/comments.json', JSON.stringify(comments));
    res.json(body);
});

// Put comments
app.put('/comments/:id', (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const index = comments.findIndex(comment => comment.id === +id);
    comments[index] = body;
    fs.writeFileSync('./data/comments.json', JSON.stringify(comments));
    res.json(body);
});

// Delete comments
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const index = comments.findIndex(comment => comment.id === +id);
    comments.splice(index, 1);
    fs.writeFileSync('./data/comments.json', JSON.stringify(comments));
    res.json(comments);
});

app.listen(3000, () => {
    console.log('Server is running on port