import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../presentation/pages/Login";
import Register from "../presentation/pages/Register";
import { HomeForm } from "../presentation/pages/Init";

const RoutesApp: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<HomeForm />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default RoutesApp;
