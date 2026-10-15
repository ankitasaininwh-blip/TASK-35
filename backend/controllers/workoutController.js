
const Workout = require("../models/Workout");

async function getWorkouts(req, res) {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    console.error("GET WORKOUTS ERROR:", error);
    res.status(500).json({
      error: "Failed to fetch workouts",
      details: error.message,
    });
  }
}

async function createWorkout(req, res) {
  try {
    const { title, load, reps } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      !Number.isFinite(Number(load)) ||
      load === "" ||
      Number(load) < 0 ||
      reps === "" ||
      !Number.isInteger(Number(reps)) ||
      Number(reps) < 1
    ) {
      return res.status(400).json({ error: "Invalid workout details" });
    }

    const workout = await Workout.create({
      title: title.trim(),
      load: Number(load),
      reps: Number(reps),
    });

    res.status(201).json(workout);
  } catch (error) {
    console.error("CREATE WORKOUT ERROR:", error);
    res.status(500).json({
      error: "Failed to create workout",
      details: error.message,
    });
  }
}

async function deleteWorkout(req, res) {
  try {
    const { id } = req.params;

    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({ error: "Invalid workout ID" });
    }

    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res.status(404).json({ error: "Workout not found" });
    }

    res.status(200).json({ message: "Workout deleted", workout });
  } catch (error) {
    console.error("DELETE WORKOUT ERROR:", error);
    res.status(500).json({
      error: "Failed to delete workout",
      details: error.message,
    });
  }
}

module.exports = {
  getWorkouts,
  createWorkout,
  deleteWorkout,
};
