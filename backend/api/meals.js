import express from 'express';
import { promises as fs } from 'fs';
const app = express();

app.get('/meals', async (req, res) => {
  try {
    const meals = await fs.readFile('../data/available-meals.json', 'utf8');
    res.json(JSON.parse(meals));
    return res
  } catch (error) {
    res.status(500).json({ message: 'Failed to load meals.' });
  }
});

export default app;
