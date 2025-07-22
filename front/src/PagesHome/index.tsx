import React from 'react';
import { Home } from './Home';

interface QrCodePageProps {
  onTrocarPagina: (pagina: string) => void;
}

export const HomeForm: React.FC<QrCodePageProps> = ({onTrocarPagina}) => {
    return (
        <>
            <Home/>
        </>
    );
};
