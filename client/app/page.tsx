import Link from "next/link";
import { groupExercisesByDay } from "../lib/exercises";

export default function Home() {
  const days = groupExercisesByDay();

  return (
    <div className="container">
      <header className="header">
        <h1>Kodhörnan</h1>
        <p>Lär dig programmera C# steg för steg</p>
      </header>

      <div className="days-grid">
        {days.map((day) => (
          <div key={day.day} className="day-section">
            <h2>Dag {day.day}</h2>
            <div className="exercise-cards">
              {day.exercises.map((exercise) => (
                <Link
                  key={exercise.id}
                  href={`/exercise/${exercise.id}`}
                  className="exercise-card"
                >
                  <div className="exercise-difficulty">{exercise.difficulty}</div>
                  <div className="exercise-title">
                    {exercise.instructions.substring(0, 50)}
                    {exercise.instructions.length > 50 ? "..." : ""}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
