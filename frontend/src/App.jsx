
import { useState } from "react";
import { useWorkouts } from "./context/WorkoutContext";
import "./App.css";

function timeAgo(date) {
  const seconds = Math.max(
    0,
    Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  );

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

export default function App() {
  const { workouts, loading, error, addWorkout, deleteWorkout } =
    useWorkouts();

  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    if (!title.trim() || load === "" || reps === "") {
      setFormError("Please fill in all fields.");
      return;
    }

    if (
      !Number.isFinite(Number(load)) ||
      Number(load) < 0 ||
      !Number.isInteger(Number(reps)) ||
      Number(reps) < 1
    ) {
      setFormError("Enter a valid load and positive whole-number reps.");
      return;
    }

    setSubmitting(true);

    const success = await addWorkout({
      title: title.trim(),
      load: Number(load),
      reps: Number(reps),
    });

    setSubmitting(false);

    if (success) {
      setTitle("");
      setLoad("");
      setReps("");
    }
  }

  async function handleDelete(id) {
    setDeletingId(id);
    await deleteWorkout(id);
    setDeletingId("");
  }

  return (
    <main className="page">
      <header className="page-header">
        <div className="brand-icon">💪</div>
        <h1>Workout Budyyy</h1>
        <p>Track your progress, one rep at a time.</p>
      </header>

      {error && (
        <div className="error-banner" role="alert">
          {error}
        </div>
      )}

      <div className="layout">
        <section className="workout-section">
          <div className="section-heading">
            <div>
              <h2>Your Workouts</h2>
              <p>{workouts.length} workouts recorded</p>
            </div>
            <span className="count-badge">{workouts.length}</span>
          </div>

          {loading ? (
            <p className="status-message">Loading workouts...</p>
          ) : workouts.length === 0 ? (
            <div className="empty-state">
              <span>🏋️</span>
              <h3>No workouts yet</h3>
              <p>Add your first workout using the form.</p>
            </div>
          ) : (
            <div className="workout-list">
              {workouts.map((workout) => (
                <article className="workout-card" key={workout._id}>
                  <div className="card-top">
                    <div className="workout-symbol">⚡</div>

                    <div className="workout-info">
                      <h3>{workout.title}</h3>
                      <p className="created-time">
                        {timeAgo(workout.createdAt)}
                      </p>
                    </div>

                    <button
                      className="delete-btn"
                      type="button"
                      title="Delete workout"
                      aria-label={`Delete ${workout.title}`}
                      disabled={deletingId === workout._id}
                      onClick={() => handleDelete(workout._id)}
                    >
                      {deletingId === workout._id ? "..." : "🗑️"}
                    </button>
                  </div>

                  <div className="workout-stats">
                    <div className="stat">
                      <span>LOAD</span>
                      <strong>{workout.load} kg</strong>
                    </div>
                    <div className="stat">
                      <span>REPS</span>
                      <strong>{workout.reps}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className="form-card">
          <div className="form-heading">
            <span className="form-icon">＋</span>
            <div>
              <h2>Add a New Workout</h2>
              <p>Log your latest exercise</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Exercise Title</label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Chest, Hamstrings"
              value={title}
              maxLength={100}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label htmlFor="load">Load (in Kgs)</label>
            <input
              id="load"
              type="number"
              placeholder="e.g. 40"
              min="0"
              step="any"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
              required
            />

            <label htmlFor="reps">Reps</label>
            <input
              id="reps"
              type="number"
              placeholder="e.g. 12"
              min="1"
              step="1"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              required
            />

            {formError && (
              <p className="form-error" role="alert">{formError}</p>
            )}

            <button
              className="submit-btn"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Adding..." : "+ Add Workout"}
            </button>
          </form>
        </aside>
      </div>

      <footer className="page-footer">
        Stay consistent. Every rep counts.
      </footer>
    </main>
  );
}

