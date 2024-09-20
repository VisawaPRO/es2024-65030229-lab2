const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB connection
const mongoUri = 'mongodb://mongodbforvisawa:27017/mydatabase'; // Change to the container name
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define schema and model
const UserSchema = new mongoose.Schema({
  studentCode: String,
  firstName: String,
  lastName: String,
  age: Number,
  email: String
});
const User = mongoose.model('User', UserSchema);

// Middleware
app.use(bodyParser.json());

// API to get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// API to create a user
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});

