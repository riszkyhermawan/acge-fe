import React from "react";
import Home from "./pages/landing/Homepage";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/landing/Loginpage";
import StudentDashboard from "./pages/student/StudentDashboard";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import { StudentProtectedRoute, TeacherProtectedRoute } from "./components/ProtectedRoute";
import Register from "./pages/landing/Registerpage";
import QuestionsPage from "./pages/student/QuestionsPage";
import CreateQuestion from "./pages/teacher/CreateQuestion";
import AddTestCases from "./pages/teacher/AddTestCases";
import EditQuestion from "./pages/teacher/EditQuestions";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<StudentProtectedRoute />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route
          path="/student/dashboard/questions/:qid"
          element={<QuestionsPage />}
        />
      </Route>

      <Route element={<TeacherProtectedRoute />}>
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
      </Route>
      <Route element={<TeacherProtectedRoute />}>
        <Route
          path="/teacher/dashboard/create-question"
          element={<CreateQuestion />}
        />
      </Route>
      <Route element={<TeacherProtectedRoute />}>
        <Route
          path="/teacher/questions/:qid/add-test-cases"
          element={<AddTestCases />}
        />
      </Route>
      <Route element={<TeacherProtectedRoute />}>
        <Route
          path="/teacher/questions/edit-question/:qid"
          element={<EditQuestion />}
        />
      </Route>
    </Routes>
  );  
};

export default App;