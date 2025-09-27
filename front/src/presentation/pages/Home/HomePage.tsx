import { Outlet } from 'react-router-dom';
import { NavBar } from '../Init/Navbar';

export const HomePage= () => {
    return (
        <div className="d-flex flex-column align-items-center min-vh-100 bg-dark">
            <div style={{ width: "400px" }}>
                <NavBar />
            </div>
            <Outlet />
        </div>
    );
};
