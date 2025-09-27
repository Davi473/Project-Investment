import React, { useEffect, useState } from 'react';
import Greeting from './Componentes/Greeting';
import "./style.css";

import ListOfWallets from './Componentes/ListOfWallets';


type Wallet = Record<string, unknown>;

export const InicioPage: React.FC = () => {
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [output, setOutput] = useState<{ id: number; text: string; item: React.ReactElement }[]>([{
        id: 2,
        text: "List Of Wallets",
        item: <ListOfWallets wallets={[]} />,
    }]);


    useEffect(() => {
        const fetchWallets = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:3000/wallet`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const responseData = await response.json();
                setWallets(responseData.wallets || []);
            } catch (e) {
                setWallets([]);
            }
        };
        fetchWallets();
    }, []);

    useEffect(() => {
        // Atualiza output quando wallets muda
        setOutput([
            {
                id: 2,
                text: "List Of Wallets",
                item: <ListOfWallets wallets={wallets} />,
            },
        ]);
        if (wallets !== undefined && wallets !== null) {
            setLoading(false);
        }
    }, [wallets]);


    if (loading) {
        return <div style={{ color: 'white', marginTop: 100 }}>Carregando...</div>;
    }

    return (    
        <div className="scroll-container" style={{ width: "430px", overflowY: "auto", marginTop: "10px", marginBottom: "50px" }}>
            <Greeting name={"Fulano"} />
            {output[0].item}
        </div>
    );
};