// Backend (Node.js with Express)
// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let tasks = [];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.status(201).json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  tasks = tasks.filter((task) => task.id !== id);
  res.status(200).json({ message: 'Task deleted' });
});

// Test deployment route
app.get('/test-deploy', (req, res) => {
  res.send('Backend deployment successful! 🚀');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
