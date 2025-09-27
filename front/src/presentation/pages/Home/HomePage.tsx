import { Outlet } from 'react-router-dom';
import { NavBar } from '../../components/Navbar';

export const HomePage= () => {
    return (
        <div className="d-flex flex-column align-items-center min-vh-100 bg-dark">
            <div className="mt-3" style={{ width: "400px" }}>
                <NavBar />
            </div>
            <Outlet />
        </div>
    );
};
