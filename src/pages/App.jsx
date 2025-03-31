// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import Login from "./Login";
import Redefinir from "./Redefinir";

export default function App() {
  const isAuthenticated = localStorage.getItem("senhaAdmin") !== null;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            isAuthenticated ? <Admin /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/redefinir" element={<Redefinir />} />
      </Routes>
    </Router>
  );
}
