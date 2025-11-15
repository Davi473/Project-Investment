import React, { useEffect, useState } from 'react';
import { storage } from '../../infra/storage/localStorage';
import { useNavigate } from 'react-router-dom';

export const InvestmentPage: React.FC = () => {
    const [investments, setInvestments] = useState<Investment>(new Investment());
    const [wallets, setWallets] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigator = useNavigate();
    useEffect(() => {
        const fetchWallets = async () => {
            try {
                const token = storage.get<string>("token");
                const response = await fetch(`http://localhost:3000/api/wallet/investment`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const responseDate = await response.json();
                setWallets(responseDate.wallets);
                try {
                    const investments = new Investment();
                    for (const wallet of responseDate.wallets) {
                        const token = storage.get<string>("token");
                        const response = await fetch(`http://localhost:3000/api/investment/${wallet.id}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`
                            }
                        });
                        const responseDate: any = await response.json();
                        investments.add(wallet.name, responseDate.investments);
                    }
                    setInvestments(investments);
                    setLoading(false)
                } catch (e) {
                    console.error("Erro no Servidor");
                }
            } catch (e) {
                console.error("Erro no Servidor");
            }

        };
        fetchWallets();
        const interval = setInterval(() => {
            fetchWallets();
        }, 180000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div style={{ color: 'white', marginTop: 100 }}>Carregando...</div>;
    }

    return (
        <div
            className="d-flex flex-column align-items-center w-100"
        >
            {investments?.currency && investments.currency().size > 0 && (
                <div
                    className="d-flex flex-column p-3 bg-white align-items-center w-100"
                    style={{
                        border: "none",
                        outline: "none",
                        boxShadow: "2px 2px 5px #222",
                        fontSize: "1em",
                        borderRadius: "20px",
                    }}
                >
                    {[...investments.currency().entries()].map(([currency, value]) => (
                        <div
                            className="d-flex flex-row justify-content-between w-75"
                            key={currency}
                            style={{
                                borderBottom: "1px solid #000",
                                paddingBottom: "3px",
                                marginBottom: "4px",
                            }}
                        >
                            <small>{currency}</small>
                            <span>
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency,
                                }).format(value)}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            <div
                className="d-flex flex-column p-3 bg-white align-items-center mt-4 w-100"
                style={{
                    border: "none",
                    outline: "none",
                    boxShadow: "2px 2px 5px #222",
                    borderRadius: "20px",
                }}
            >
                <p>Fazer Um Grafico Aqui</p>
            </div>

            {
                wallets.map(wallet => (
                    <div
                        className="d-flex flex-column bg-white align-items-center mt-4 w-100"
                        key={wallet.id}
                        style={{
                            border: "none",
                            outline: "none",
                            boxShadow: "2px 2px 5px #222",
                            borderRadius: "20px",
                        }}
                        onClick={() => navigator(`/wallet/${wallet.id}?name=${wallet.name}`)}
                    >
                        <p className="mt-2" >{wallet.name}</p>
                        {!!investments.wallet(wallet.name).entries() && (
                            <div
                                className="d-flex flex-row justify-content-between w-75"
                            >
                                <table className="table table-borderless w-100 text-center">
                                    <thead>
                                        <tr>
                                            <td>Currency</td>
                                            <td>Input</td>
                                            <td>Amount</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[...investments.wallet(wallet.name).entries()].map(([currency, investment]) => (
                                            <tr
                                                key={currency}
                                            >
                                                <td>{currency}</td>
                                                <td>
                                                    {
                                                        new Intl.NumberFormat("en-US", {
                                                            style: "currency",
                                                            currency: currency,
                                                        }).format(investment.amount)
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        new Intl.NumberFormat("en-US", {
                                                            style: "currency",
                                                            currency: currency,
                                                        }).format(investment.currentValue)
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))
            }
        </div>
    );
};

class Investment {
    private investments: Map<string, any> = new Map();

    public add(wallet: string, investment: any): void {
        this.investments.set(wallet, investment);
    }

    public wallet(wallet: string): Map<string, any> {
        const walletCurrency: Map<string, any> = new Map();
        const investments: any[] = this.investments.get(wallet);
        investments.forEach(investment => {
            if (!walletCurrency.get(investment.currency))
                walletCurrency.set(investment.currency, { amount: 0, currentValue: 0 });
            let object = walletCurrency.get(investment.currency);
            object.currentValue += (investment.currentValue * investment.quantity);
            object.amount += (investment.average * investment.quantity);
            walletCurrency.set(investment.currency, object);
        });
        return walletCurrency;
    }

    public currency(): Map<string, any> {
        const walletCurrency: Map<string, any> = new Map();
        this.investments.forEach((investment: any[]) => {
            investment.forEach(investment => {
                if (!walletCurrency.get(investment.currency))
                    walletCurrency.set(investment.currency, 0);
                let value = walletCurrency.get(investment.currency);
                value += (investment.currentValue * investment.quantity);
                walletCurrency.set(investment.currency, value);
            });
        });
        return walletCurrency;
    }
}