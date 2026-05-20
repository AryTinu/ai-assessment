import { Routes, Route } from "react-router-dom";

/* PUBLIC PAGES */

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

/* DASHBOARD PAGES */

import Dashboard from "./pages/Dashboard";
import Assessments from "./pages/Assessments";
import Leaderboard from "./pages/Leaderboard";
import Results from "./pages/Results";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import AssessmentPage from "./pages/AssessmentPage";

/* PROTECTED ROUTE */

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  return (
    <Routes>

      {/* LANDING PAGE */}

      <Route
        path="/"
        element={<LandingPage />}
      />

      {/* LOGIN */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* REGISTER */}

      <Route
        path="/register"
        element={<Register />}
      />

      {/* DASHBOARD */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ASSESSMENTS */}

      <Route
        path="/assessments"
        element={
          <ProtectedRoute>
            <Assessments />
          </ProtectedRoute>
        }
      />

     <Route
  path="/assessment/:id"
  element={
    <ProtectedRoute>
      <AssessmentPage />
    </ProtectedRoute>
  }
/>


      {/* LEADERBOARD */}

      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        }
      />

      {/* RESULTS */}

      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
      />

      {/* ANALYTICS */}

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        }
      />

      {/* SETTINGS */}

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;