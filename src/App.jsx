import React from "react";
import Home from "./pages/landing/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/landing/Login";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/Dashboard";
import { StudentProtectedRoute, TeacherProtectedRoute } from "./components/ProtectedRoute";
import Register from "./pages/landing/Register";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<StudentProtectedRoute />}>
          <Route
            path="/student/dashboard"
            element={<StudentDashboard />}
          />
        </Route>

        <Route element={<TeacherProtectedRoute />}>
          <Route
            path="/teacher/dashboard"
            element={<TeacherDashboard />}
          />
        </Route>
      </Routes>
  );  
};

export default App;