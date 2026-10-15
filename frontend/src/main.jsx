
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { WorkoutProvider } from "./context/WorkoutContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WorkoutProvider>
      <App />
    </WorkoutProvider>
  </StrictMode>
);
