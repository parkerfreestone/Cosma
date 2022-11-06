import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "../pages/auth/Register";
import { Explore } from "../pages/Explore";
import { Navigation } from "./Navigation";
import { Login } from "../pages/auth/Login";
import { Profile } from "../pages/Profile";

export const Router = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="profile" element={<Profile />} />
        {/* <Route path="new-post" element={<Profile />} /> */}
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
