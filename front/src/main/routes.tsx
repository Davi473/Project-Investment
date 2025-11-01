import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../presentation/pages/Login";
import Register from "../presentation/pages/Register";
import { HomePage } from "../presentation/pages/Home/HomePage";
import { WindowControls } from "../shared/components/WindowControls";
import { InicioPage } from "../presentation/pages/Home/Init/Inicio";
import { InvestmentPage } from "../presentation/pages/Investment/InvestmentPage";
import { WalletInvestment } from "../presentation/pages/WalletInvestment";
import { ConfigPage } from "../presentation/pages/Home/config";
import { BillPage } from "../presentation/pages/Bill";

const RoutesApp: React.FC = () => {
    return (
        <>
            <WindowControls />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<HomePage />}>
                    <Route path="" element={<InicioPage />} />
                    <Route path="config" element={<ConfigPage />} />
                    <Route path="inicio" element={<InicioPage />} />
                    <Route path="investment" element={<InvestmentPage />} />
                    <Route path="bill" element={<BillPage />} />
                    <Route index path="*" element={<Navigate to="/home" replace />} />
                </Route>
                <Route path="/wallet/:id" element={<WalletInvestment />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </>
    );
};

export default RoutesApp;
