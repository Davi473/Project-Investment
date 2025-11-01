import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes";

const App: React.FC = () => {
    document.body.style.backgroundColor = "transparent";
    const root = document.getElementById("root");

    // if (root) {
    //     root.style.borderRadius = "15px";
    //     root.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
    //     root.style.border = "2px solid white";
    //     root.style.overflow = "hidden";
    // }
    
    return (
        <BrowserRouter>
            <RoutesApp />
        </BrowserRouter>
    );
};

export default App;
