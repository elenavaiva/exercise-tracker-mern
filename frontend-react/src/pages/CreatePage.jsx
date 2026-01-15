import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePage() {
  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kgs");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const newExercise = {
      name,
      reps: parseInt(reps, 10),
      weight: parseInt(weight, 10),
      unit,
      date,
    };

    try {
      const response = await fetch("/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExercise),
      });

      if (response.status === 201) {
        alert("Exercise was created!");
      } else {
        alert("Exercise was not created.");
      }
    } catch (err) {
      console.error("Exercise was not created", err);
      alert("Exercise was not created.");
    }

    // goes back to home page.
    navigate("/");
  }

  return (
    <section>
      <h2>Add Exercise</h2>

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
          <button type="submit">Create Exercise</button>
        </p>
      </form>
    </section>
  );
}

export default CreatePage;
