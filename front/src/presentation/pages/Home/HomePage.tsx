import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { storage } from '../../../infra/storage/localStorage';
import { getUseCase } from '../../../domain/useCases/GetUserUseCase';
import "./style.css";

export const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const init = async () => {
            const token = storage.get<string>("token");
            if (!token) return navigate("/login");
            const response = await getUseCase();
            storage.set<any>("user", response.user);
        };
        init();
    }, [navigate]);


    const [config, setConfig] = useState(false);
    // const togglePopup = () => setConfig((prev) => !prev);
    const [ativo, setAtivo] = useState("a");

    const line = {
        height: "4px",
        width: "20px",
        backgroundColor: "#111",
        borderRadius: "3px",
        transition: "all 0.3s ease-in-out",
        boxShadow: "0 1px 2.5px rgba(0, 0, 0, 0.3)",
        transformOrigin: "center",
    };

    return (
    <div className="d-flex flex-column align-items-center bg-dark vh-100">
            <header className="mt-3 w-50">
                <div
                    className="mt-3 w-100 p-2 rounded-4 border-0 shadow-sm bg-light d-flex justify-content-between"
                    style={{ height: "35px", fontSize: "1em" }}
                >
                    <nav className="d-flex align-items-center justify-content-center">
                        <Link
                            to="/home/inicio"
                            className={`text-center ms-2 text-decoration-none fw-bolder ${ativo === "a" ? "text-secondary" : "text-dark"}`}
                            onClick={() => setAtivo("a")}
                        >
                            HOME
                        </Link>
                        <Link
                            to="/home/investment"
                            className={`text-center ms-2 text-decoration-none fw-bolder ${ativo === "b" ? "text-secondary" : "text-dark"}`}
                            onClick={() => setAtivo("b")}
                        >
                            INVESTMENT
                        </Link>
                        {/* <Link
                            to="/home/bill"
                            className={`text-center ms-2 text-decoration-none fw-bolder ${ativo === "c" ? "text-secondary" : "text-dark"}`}
                            onClick={() => setAtivo("c")}
                        >
                            BILL
                        </Link> */}
                    </nav>
                    <div className="d-flex align-items-center justify-content-center me-2">
                        <button
                            type="button"
                            className="d-flex flex-column justify-content-evenly p-2 position-relative bg-transparent border-0"
                            style={{ height: "20px", width: "20px", zIndex: 1001 }}
                            onClick={() => {
                                if (config)
                                    navigate(-1);
                                if (!config)
                                    navigate("/home/config");
                                setConfig((prev) => !prev);
                            }}
                            aria-label="Configurações"
                        >
                            <div
                                className="position-absolute rounded"
                                style={{ ...line, transform: config ? "rotate(45deg)" : "rotate(0deg) translateY(-8px)" }}
                            />
                            <div
                                className="position-absolute rounded"
                                style={{ ...line, ...(config ? { opacity: 0 } : { opacity: 1, transform: "translateY(0)" }) }}
                            />
                            <div
                                className="position-absolute rounded"
                                style={{ ...line, transform: config ? "rotate(-45deg)" : "rotate(0deg) translateY(8px)" }}
                            />
                        </button>
                    </div>
                </div>
            </header>
            <main
                className="scroll-container overflow-auto d-flex flex-column align-items-center bg-dark w-50 flex-grow-1 mt-3 p-3"
            >
                <Outlet />
            </main>
        </div>
    );
};
