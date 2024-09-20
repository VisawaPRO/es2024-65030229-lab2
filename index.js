const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS for cross-origin requests

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
app.use(cors()); // Enable CORS
app.use(express.static('public'));

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

app.put('/api/students/:id', async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!student) return res.status(404).send('Student not found');
  res.json(student);
});

app.delete('/api/students/:id', async (req, res) => {
  const result = await Student.findByIdAndDelete(req.params.id);
  if (!result) return res.status(404).send('Student not found');
  res.json({ message: 'Student deleted' });
});

// Serve the index.html file from the public directory
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Express app listening at http://localhost:${port}`);
});
