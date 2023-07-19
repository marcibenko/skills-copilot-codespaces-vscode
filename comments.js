// Create web server

// Import dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Comment = require('./models/comment');

// Create server
const app = express();

// Configure middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

// Configure routes
app.get('/comments', (req, res) => {
  Comment.find({}, (err, comments) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ comments });
  });
});

app.post('/comments', (req, res) => {
  const { body } = req;
  Comment.create(body, (err, comment) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ comment });
  });
});

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  Comment.findByIdAndDelete(id, (err, comment) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ comment });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Listening on port 3000');
});