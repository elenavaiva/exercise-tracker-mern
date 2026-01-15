import { useNavigate } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable';
import { useState, useEffect} from 'react';

function RetrievePage() {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate(); //move to another page.

    useEffect(() => { // runs when component loads first.
        loadExercises();
      }, []);
    
      // get exercises:
      async function loadExercises() {
        try {
          const response = await fetch("/exercises"); // calling get.
          const data = await response.json(); // convert response to json.
          setExercises(data);
        } catch (err) {
          console.error("Error loading exercises", err);
        }
      }
    
      // delete one exercise:
      async function onDeleteExercise(id) {
        const response = await fetch(`/exercises/${id}`, {
          method: "DELETE",
        });
    
        if (response.status === 204) {
          setExercises(exercises.filter((ex) => ex._id !== id)); // remove exercise.
        } else {
          alert("Error deleting exercises");
        }
      }
    
      // function to edit one exercise, send to update page.
      function onEditExercise(exercise) {
        navigate("/update", { state: exercise });
      }
    
      return (
        <section>
        <h2>Exercises</h2>
  
        {exercises.length > 0 ? (
          <ExerciseTable
            exercises={exercises}
            onDelete={onDeleteExercise}
            onEdit={onEditExercise}
          />
        ) : (
          <p>No exercises found!</p>
        )}
      </section>
    );
  }

export default RetrievePage;