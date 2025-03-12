// Backend (Node.js with Express)
// server.js

const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
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
  
  if (!task || !task.id || !task.name) {
    return res.status(400).json({ message: 'Task ID and name are required' });
  }
  
  tasks.push(task);
  console.log(`Task added: ${task.name}`);
  res.status(201).json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const id = req.params.id;
  const initialLength = tasks.length;

  tasks = tasks.filter((task) => task.id !== id);

  if (tasks.length === initialLength) {
    return res.status(404).json({ message: 'Task not found' });
  }

  console.log(`Task deleted: ${id}`);
  res.status(200).json({ message: 'Task deleted' });
});

// Test deployment route
app.get('/test-deploy', (req, res) => {
  res.send('Backend deployment successful! 🚀');
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
