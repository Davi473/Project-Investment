import { Link } from "react-router-dom";
import { LoginFrom } from "../components/LoginFrom";


export const LoginPage = () => (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
        <div className="d-flex flex-column gap-3 text-white text-center">
            <h1 className="fw-bold" id="login">Login</h1>
            <LoginFrom />
            <span className="mt-2 text-white-50">
                Click here to{" "}
                <Link
                    className="text-decoration-underline text-white"
                    style={{ cursor: "pointer" }}
                    to={"/register"}
                >
                    Register
                </Link>
            </span>
        </div>
    </div>
);
