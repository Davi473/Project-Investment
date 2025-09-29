import { Outlet, useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/Navbar';
import { useEffect } from 'react';
import { storage } from '../../../infra/storage/localStorage';
import { getUseCase } from '../../../domain/useCases/GetUserUseCase';

export const HomePage= () => {
    const navigater = useNavigate();

    useEffect(() => {
        const init = async () => {
            const token = storage.get<string>("token");
            // if (!token) return navigater("/login");
            const response = await getUseCase();
            storage.set<any>("user", response.user);
        }
        init();
    }, []);

    return (
        <div className="d-flex flex-column align-items-center min-vh-100 bg-dark">
            <div className="mt-3" style={{ width: "400px" }}>
                <NavBar />
            </div>
            <Outlet />
        </div>
    );
};
