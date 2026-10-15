
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";

const WorkoutContext = createContext(null);

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/workouts";

const initialState = {
  workouts: [],
  loading: true,
  error: "",
};

function workoutReducer(state, action) {
  switch (action.type) {
    case "SET_WORKOUTS":
      return { ...state, workouts: action.payload, loading: false, error: "" };

    case "ADD_WORKOUT":
      return { ...state, workouts: [action.payload, ...state.workouts], error: "" };

    case "DELETE_WORKOUT":
      return {
        ...state,
        workouts: state.workouts.filter((w) => w._id !== action.payload),
        error: "",
      };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "CLEAR_ERROR":
      return { ...state, error: "" };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

export function WorkoutProvider({ children }) {
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  const fetchWorkouts = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load workouts");
      }

      dispatch({ type: "SET_WORKOUTS", payload: data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  async function addWorkout(workoutData) {
    dispatch({ type: "CLEAR_ERROR" });

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workoutData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create workout");
      }

      dispatch({ type: "ADD_WORKOUT", payload: data });
      return true;
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      return false;
    }
  }

  async function deleteWorkout(id) {
    dispatch({ type: "CLEAR_ERROR" });

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete workout");
      }

      dispatch({ type: "DELETE_WORKOUT", payload: id });
      return true;
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: err.message });
      return false;
    }
  }

  return (
    <WorkoutContext.Provider
      value={{ ...state, addWorkout, deleteWorkout, fetchWorkouts }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkouts() {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw new Error("useWorkouts must be used inside WorkoutProvider");
  }

  return context;
}
