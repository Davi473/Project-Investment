import React, { useEffect, useState } from 'react';
import { storage } from '@/shared/storage/localStorage';
import Property from './Property';
import ListOfWallets from './ListOfWallets';
import { day } from '@/shared/utils/day';


export const HomeFrom: React.FC = () => {
    const [investments, setInvestments] = useState<Investment>(new Investment());
    const [wallets, setWallets] = useState<any[]>([]);
    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWallets = async () => {
            try {
                const token = storage.get<string>("token");
                const investments = new Investment();
                // Wallets
                const response = await fetch(`http://localhost:3000/api/wallet/investment`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const responseDate = await response.json();
                setWallets(responseDate.wallets);
                // User
                const responseUser = await fetch(`http://localhost:3000/api/users`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const userDate = await responseUser.json();
                setUser(userDate.user)
                investments.currecyUser(userDate.user.currency, userDate.user.value);
                // Investment
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
                console.log(investments);
                setLoading(false);
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

    const output: any[] = [
        { id: 1, text: "Property", render: () => <Property value={investments.property()} /> },
        {
            id: 2, text: "List Of Wallets", render: () =>
                <ListOfWallets
                    wallets={wallets}
                    investments={investments}
                />
        },
        // {
        //     id: 3, text: "List Order Investment", render: () =>
        //     (investments.recentDates().length !== 0 &&
        //         <ListOrderInvestment
        //             values={investments.recentDates()}
        //             title={"Order List"}
        //         />
        //     )
        // },
    ];

    if (loading) {
        return <div style={{ color: 'white', marginTop: 100 }}>Carregando...</div>;
    }

    return (
        <div>
            <div className="text-white d-flex flex-column justify-content-evenly p-3 mt-4">
                <small>{day()},</small>
                <small>Mr. {user.name.toUpperCase()}</small>
            </div>
            <div className="mt-4">
                {output.map(section => (
                    <div key={section.id}>
                        {section.render()}
                    </div>
                ))}
            </div>
        </div>
    );
};

class Investment {
    public investments: Map<string, any> = new Map();
    private currency: string = "USD";
    private value: number = 1;

    public add(wallet: string, investment: any): void {
        this.investments.set(wallet, investment);
    }

    public currecyUser(currency: string, value: number) {
        this.currency = currency;
        this.value = value;
    }

    public wallet(wallet: string, currency: number): any {
        const walletCurrency: Map<string, any> = new Map();
        const investments: any[] = this.investments.get(wallet);
        investments.forEach(investment => {
            if (!walletCurrency.get(investment.currency))
                walletCurrency.set(investment.currency, { amount: 0, currentValue: 0, currency: investment.userCurrency });
            let object = walletCurrency.get(investment.currency);
            object.currentValue += (investment.currentValue * investment.quantity);
            object.amount += (investment.average * investment.quantity);
            walletCurrency.set(investment.currency, object);
        });
        const value = { amount: 0, currencyValue: 0 };
        walletCurrency.forEach((investment: any) => {
            value.amount += (investment.amount * (currency / investment.currency));
            value.currencyValue += (investment.currentValue * (currency / investment.currency));
        })
        return value;
    }

    public property(): any {
        const currencys: Map<string, any> = new Map();
        this.investments.forEach((investment: any[]) => {
            investment.forEach(investment => {
                if (!currencys.get(investment.currency))
                    currencys.set(investment.currency, { amount: 0, currencyValue: 0, currency: investment.userCurrency });
                let value = currencys.get(investment.currency);
                value.amount += (investment.average * investment.quantity);
                value.currencyValue += (investment.currentValue * investment.quantity);
                currencys.set(investment.currency, value);
            });
        });
        const value = { amount: 0, currencyValue: 0, currency: this.currency };
        currencys.forEach(investment => {
            value.amount += (investment.amount * (this.value / investment.currency));
            value.currencyValue += (investment.currencyValue * (this.value / investment.currency));
        })
        return value;
    }

    public listLimitTen(): Map<string, any> {
        const currencys: Map<string, any> = new Map();
        this.investments.forEach((investment: any[]) => {
            investment.forEach(investment => {
                if (!currencys.get(investment.currency))
                    currencys.set(investment.currency, 0);
                let value = currencys.get(investment.currency);
                value += (investment.currentValue * investment.quantity);
                currencys.set(investment.currency, value);
            });
        });
        return currencys;
    }

    public recentDates(): string[] {
        const allInvestments: any[] = [];
        this.investments.forEach((inv: any[]) => allInvestments.push(...inv));
        allInvestments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const lastFive = allInvestments.slice(0, 5);
        return lastFive;
    }
}