import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function UpdatePage() {
  const navigate = useNavigate();
  const location = useLocation();

  const exercise = location.state;

  // if no exercise selected:
  if (!exercise) {
    return (
      <section>
        <h2>Edit Exercise</h2>
        <p>Exercise has not been selected!.</p>
      </section>
    );
  }

  // Format the date: 
  let initialDate = "";
  if (exercise.date) {
    const parts = exercise.date.split("T");
    initialDate = parts[0]; 
  }

  const [name, setName] = useState(exercise.name);
  const [reps, setReps] = useState(exercise.reps);
  const [weight, setWeight] = useState(exercise.weight);
  const [unit, setUnit] = useState(exercise.unit);
  const [date, setDate] = useState(initialDate);

  const id = exercise._id;

  // handling form submit:
  async function handleSubmit(e) {
    e.preventDefault();

    const updatedExercise = {
      name,
      reps: parseInt(reps, 10),
      weight: parseInt(weight, 10),
      unit,
      date,
    };

    try {
      const response = await fetch(`/exercises/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedExercise),
      });

      if (response.status === 200) {
        alert("Exercise has been updated!");
      } else {
        alert("Exercise not updated.");
      }
    } catch (err) {
      console.error("Exercise not updated", err);
      alert("Exercise not updated.");
    }

    // Go back to home page:
    navigate("/");
  }

  return (
    <section>
      <h2>Edit Exercise</h2>

      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </p>

        <p>
          <label htmlFor="reps">Reps (Distance): </label>
          <input
            id="reps"
            type="number"
            min="1"
            value={reps}
            required
            onChange={(e) => setReps(e.target.value)}
          />
        </p>

        <p>
          <label htmlFor="weight">Weight: </label>
          <input
            id="weight"
            type="number"
            min="0"
            value={weight}
            required
            onChange={(e) => setWeight(e.target.value)}
          />
        </p>

        <p>
          <label htmlFor="unit">Unit: </label>
          <select
            id="unit"
            value={unit}
            required
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="kgs">kgs</option>
            <option value="lbs">lbs</option>
            <option value="miles">miles</option>
          </select>
        </p>

        <p>
          <label htmlFor="date">Date: </label>
          <input
            id="date"
            type="date"
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </p>

        <p>
          <button type="submit">Update Exercise</button>
        </p>
      </form>
    </section>
  );
}

export default UpdatePage;