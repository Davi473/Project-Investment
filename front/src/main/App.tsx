import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";

const App: React.FC = () => {
    document.body.style.backgroundColor = "transparent";
    return (
        <BrowserRouter>
            <RoutesApp />
        </BrowserRouter>
    );
};

export default App;
