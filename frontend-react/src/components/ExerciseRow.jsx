import { FaEdit, FaTrash } from "react-icons/fa";

function ExerciseRow({ exercise, onEdit, onDelete }) {
  
  const formattedDate = exercise.date ? exercise.date.split("T")[0] : "";

  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.reps}</td>
      <td>{exercise.weight}</td>
      <td>{exercise.unit}</td>
      <td>{formattedDate}</td>
      <td>
        <FaEdit onClick={() => onEdit(exercise)} title="Edit Exercise" />
        <FaTrash onClick={() => onDelete(exercise._id)} title="Delete Exercise" />
      </td>
    </tr>
  );
}

export default ExerciseRow;
