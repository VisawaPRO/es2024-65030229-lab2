const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// MongoDB connection
const mongoUri = 'mongodb://mongodbforjing:27017/mydatabase';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Define a simple schema and model
const StudentSchema = new mongoose.Schema({
  studentCode: String,
  firstName: String,
  lastName: String,
  age: Number,
  email: String
});
const Student = mongoose.model('Student', StudentSchema);

// Middleware
app.use(express.json());

// API endpoints
app.get('/api/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post('/api/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).json(student);
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});

