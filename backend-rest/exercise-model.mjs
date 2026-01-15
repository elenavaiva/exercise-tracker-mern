import mongoose from 'mongoose';
import 'dotenv/config';

let connection = undefined;

async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

// Schema for exercise properties:

const exerciseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true, min: [1, "Reps must be more than 0"]},
    weight: {type: Number, required: true, min: [0, "Weight must be >= 0"]},
    unit: {type: String, required: true, enum: ["kgs", "lbs", "miles"]},
    date: {type: Date, default: Date.now}
}, {
    collection: "exercises"
});

// Model for exercises:
const Exercise = mongoose.model('exercises', exerciseSchema);

// Create exercise, add to database.
async function createExercise(exerciseData) {
    const addNewExercise = new Exercise(exerciseData); // makes a new exercise object
    return await addNewExercise.save(); // returns the exercise, saves to mongodb
}

// Read using GET:
async function getExercises(filter = {}) { 
    return await Exercise.find(filter);
}
// Read by id:
async function getExerciseById(id) {
    return await Exercise.findById(id);
}

// Update by id:
async function updateExercise(id, data) {
    return await Exercise.findByIdAndUpdate(id, data, {new: true}); // returns updated version.
}

// Delete by id:
async function deleteExerciseById(id) {
    return await Exercise.findByIdAndDelete(id); // returns the deleted doc.
}


export {connect, createExercise, getExerciseById, getExercises, updateExercise, deleteExerciseById};