import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import Login from "./pages/Login";

import Register from "./pages/Register";

import "./App.css";

const App = () => {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <Dashboard />
          }
        />

      </Routes>

    </BrowserRouter>
  );
};

export default App;