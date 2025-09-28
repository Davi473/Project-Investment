import { useState } from "react";
import { Link } from "react-router-dom";


export const NavBar = () => {
    const [config, setConfig] = useState<boolean>(false);
    const togglePopup = () => setConfig(!config);
    const [ativo, setAtivo] = useState<string | null>(null);

    const line = {
        height: "4px",
        width: "20px",
        backgroundColor: "#111",
        borderRadius: "3px",
        transition: "all 0.3s ease-in-out",
        boxShadow: "0 1px 2.5px rgba(0, 0, 0, 0.3)",
        transformOrigin: "center"
    };

    return (
        <div
            className="mt-3 w-100 p-2 rounded-4 border-0 shadow-sm bg-light d-flex justify-content-between"
            style={{ width: "400px", height: "35px", fontSize: "1em" }}
        >
            <div className="d-flex align-items-center justify-content-center">
                <Link 
                    to="/home/inicio" 
                    className={"text-center ms-2 text-decoration-none fw-bolder " + (ativo === "a" ? "text-secondary" : "text-dark")}
                    onClick={() => setAtivo("a")}
                >
                    HOME
                </Link>
                <Link 
                    to="" 
                    className={"text-center ms-2 text-decoration-none fw-bolder " + (ativo === "b" ? "text-secondary" : "text-dark")}
                    onClick={() => setAtivo("b")}
                >
                    INVESTMENT
                </Link>
                <Link 
                    to="" 
                    className={"text-center ms-2 text-decoration-none fw-bolder " + (ativo === "c" ? "text-secondary" : "text-dark")}
                    onClick={() => setAtivo("c")}
                >
                    BILL
                </Link>
            </div>
            <div className="d-flex align-items-center justify-content-center me-2">
                <Link 
                    to=""
                    className="d-flex flex-column justify-content-evenly p-2 position-relative"
                    style={{ height: "20px", width: "20px", zIndex: "1001" }}
                    onClick={togglePopup}
                >
                    <div
                        className="position-absolute rounded"
                        style={{ ...line, transform: config ? "rotate(45deg)" : "rotate(0deg) translateY(-8px)" }}
                    />
                    <div
                        className="position-absolute rounded"
                        style={{ ...line, ...(config ? { opacity: "0" } : { opacity: 1, transform: "translateY(0)" }) }}
                    />
                    <div
                        className="position-absolute rounded"
                        style={{ ...line, transform: config ? "rotate(-45deg)" : "rotate(0deg) translateY(8px)" }}
                    />
                </Link>
            </div>
        </div>
    );
};