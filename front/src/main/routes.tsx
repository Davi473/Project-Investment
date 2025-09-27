import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../presentation/pages/Login";
import Register from "../presentation/pages/Register";
import { HomePage } from "../presentation/pages/Home/HomePage";
import { WindowControls } from "../shared/components/WindowControls";
import DragBar from "../shared/components/WindowControls/DragBar";
import { InicioPage } from "../presentation/pages/Init/Inicio";

const RoutesApp: React.FC = () => {
    return (
        <>
            <WindowControls />
            <DragBar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<HomePage />}>
                    <Route path="inicio" element={<InicioPage />} />
                    <Route index path="*" element={<Navigate to="inicio" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </>
    );
};

export default RoutesApp;
