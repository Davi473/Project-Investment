import React, { useEffect, useState } from 'react';
import "./style.css";
import ListOfWallets from './Componentes/ListOfWallets';
import { storage } from '../../../../infra/storage/localStorage';
import ListOrderInvestment from '../ListOrderInvestment';
import Property from './Componentes/Property';

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
                const token = storage.get<string>("token");
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
        setOutput([
            {
                id: 1,
                text: "Property",
                item: <Property />
            },
            {
                id: 2,
                text: "List Of Wallets",
                item: <ListOfWallets wallets={wallets} />
            },
            {
                id: 3,
                text: "List Order Investment",
                item: <ListOrderInvestment />
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
            <div className="text-white" style={{ width: "420px", marginTop: "100px", marginBottom: "100px"}}>
                <div className="d-flex flex-column justify-content-evenly p-3">
                    <small>{day()},</small>
                    <small>{"Fulano"}</small>
                </div>
            </div>
            {
                output.map(tag => tag.item)
            }
        </div>
    );
};

function day() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 18)  return "Good Afternoon";
    else return "Good Evening";
}