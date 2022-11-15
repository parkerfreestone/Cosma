import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Register } from "../pages/auth/Register";
import { Explore } from "../pages/Explore";
import { Navigation } from "./Navigation";
import { Login } from "../pages/auth/Login";
import { Profile } from "../pages/Profile";
import { useAuthContext } from "../context/UserContext";

export const Router = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const ProtectedRoute = ({ children }) => {
  const { signedIn } = useAuthContext();

  if (!signedIn) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
