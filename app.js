const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ---- Mongoose model ----
const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});
const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

// ---- Health check (used by Docker/Kubernetes liveness probe) ----
app.get('/health', (req, res) => {
  const dbState = mongoose.connection.readyState; // 1 = connected
  if (dbState === 1) {
    res.status(200).json({ status: 'ok', db: 'connected' });
  } else {
    res.status(200).json({ status: 'ok', db: 'not_connected' });
  }
});

// ---- Readiness check (used by Kubernetes readiness probe) ----
app.get('/ready', (req, res) => {
  res.status(mongoose.connection.readyState === 1 ? 200 : 503).send();
});

// ---- CRUD routes ----
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    if (!req.body.title) {
      return res.status(400).json({ error: 'title is required' });
    }
    const todo = new Todo({ title: req.body.title });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
