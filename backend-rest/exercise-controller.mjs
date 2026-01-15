import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercise-model.mjs';

const app = express();
app.use(express.json())

const PORT = process.env.PORT;

// Validation:

function isInteger(n){
    return Number.isInteger(n);
}

function isValidDate(dateString) {
    if (dateString === undefined || dateString === null || dateString === '') {
        return true;
    }
    const datesTrue = Date.parse(dateString);
    return Number.isFinite(datesTrue); // returns true if the date is valid;
}

function isValidExercise(body) {
    if (!body || typeof body !== 'object') return false;

    const name = body.name;
    const reps = body.reps;
    const weight = body.weight;
    const unit = body.unit;
    const date = body.date;

    // check if required fields are there:
    if (name === undefined || reps === undefined || weight === undefined || unit === undefined) {
        return false;
      }
    
      // field checks:
      if (typeof name !== 'string' || name.length === 0) return false;
      if (!isInteger(reps) || reps <= 0) return false;
      if (!isInteger(weight) || weight < 0) return false;
      if (!['kgs', 'lbs', 'miles'].includes(unit)) return false;
      if (!isValidDate(date)) return false;

      return true;
}


app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});

// POST: 
app.post('/exercises', asyncHandler(async (req, res) => {
    if (!isValidExercise(req.body)) {
      return res.status(400).json({Error: 'Invalid request'});
    }
  
    const created = await exercises.createExercise(req.body);
    res.status(201).json(created);
  }));
  
  // GET ALL:
  app.get('/exercises', asyncHandler(async (_req, res) => {
    const all = await exercises.getExercises({});
    res.status(200).json(all);
  }));
  
  // GET one:
  app.get('/exercises/:id', asyncHandler(async (req, res) => {
    const doc = await exercises.getExerciseById(req.params.id);
  
    if (doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({Error: 'Not found'});
    }
  }));
  
  // PUT:
  app.put('/exercises/:id', asyncHandler(async (req, res) => {
    if (!isValidExercise(req.body)) {
      return res.status(400).json({Error: 'Invalid request'});
    }
  
    const updated = await exercises.updateExercise(req.params.id, req.body);
  
    if (updated) {
      res.status(200).json(updated);
    } else {
      res.status(404).json({Error: 'Not found'});
    }
  }));
  
  // DELETE by id:
  app.delete('/exercises/:id', asyncHandler(async (req, res) => {
    const deleted = await exercises.deleteExerciseById(req.params.id);
  
    if (deleted) {
      res.status(204).json(); // return empty body;
    } else {
      res.status(404).json({Error: 'Not found'});
    }
  }));