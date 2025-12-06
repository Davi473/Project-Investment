import React, { useEffect, useState } from 'react';
import { storage } from '@/shared/storage/localStorage';
import Property from './Property';
import ListOfWallets from './ListOfWallets';
import { day } from '@/shared/utils/day';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useInvestment } from '../hooks/useInvestment';


export const HomeFrom: React.FC = () => {
    const [investments, setInvestments] = useState<Investment>();
    const [wallets, setWallets] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigator = useNavigate();
    const { getWallets } = useWallet();
    const { user, getUser } = useAuth();
    const { getInvestment } = useInvestment();

    const fetchWallets = async () => {
        try {
            const investments = new Investment(user.currency, user.value);
            // Get User's Wallets
            const response = await getWallets();
            setWallets(response.data.wallets);
            for (const wallet of response.data.wallets) {
                // Get Investment For Wallet
                const response = await getInvestment(wallet.id);
                investments.add(wallet.name, response.data.investments);
            }
            setInvestments(investments);
            setLoading(false);
        } catch (e) {
            console.log(e.message);
        }
    };

    const init = async () => {
        try {
            await getUser();
            await fetchWallets();
        } catch (e: any) {
            alert(e.data.message);
            navigator("/login");
        }
    }

    useEffect(() => {
        init();

        const interval = setInterval(() => {
            fetchWallets();
        }, 180000);

        return () => clearInterval(interval);
    }, []);

    const output: any[] = [
        { id: 1, text: "Property", render: () => <Property value={investments.getTotalPortfolioValue()} /> },
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
        <div className="w-100">
            <div className="text-white d-flex flex-column justify-content-evenly mt-4 w-100">
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

    constructor(private currency: string, private value: number) {
    }

    public add(wallet: string, investment: any): void {
        this.investments.set(wallet, investment);
    }

    public calculateWalletSummary(walletId: string, targetCurrencyRate: number): any {
        const investments: any[] = this.investments.get(walletId) || [];
        const summary: any = {
            totalInvested: 0,
            totalCurrentValue: 0
        };
        if (investments.length === 0) {
            return summary;
        }
        for (const investment of investments) {
            if (investment.userCurrency === 0) continue;
            const conversionRatio = targetCurrencyRate / investment.userCurrency;
            const investedAmount = investment.average * investment.quantity;
            const marketValue = investment.currentValue * investment.quantity;
            summary.totalInvested += investedAmount * conversionRatio;
            summary.totalCurrentValue += marketValue * conversionRatio;
        }
        return summary;
    }

    public getTotalPortfolioValue(): any {
        const summary: any = {
            amount: 0,
            currencyValue: 0,
            currency: this.currency
        };
        this.investments.forEach((investmentList: any[]) => {
            for (const investment of investmentList) {
                if (!investment.userCurrency || investment.userCurrency === 0) continue;
                const conversionRate = this.value / investment.userCurrency;
                const investedTotal = investment.average * investment.quantity;
                const currentTotal = investment.currentValue * investment.quantity;
                summary.amount += investedTotal * conversionRate;
                summary.currencyValue += currentTotal * conversionRate;
            }
        });

        return summary;
    }

    // public listLimitTen(): Map<string, any> {
    //     const currencys: Map<string, any> = new Map();
    //     this.investments.forEach((investment: any[]) => {
    //         investment.forEach(investment => {
    //             if (!currencys.get(investment.currency))
    //                 currencys.set(investment.currency, 0);
    //             let value = currencys.get(investment.currency);
    //             value += (investment.currentValue * investment.quantity);
    //             currencys.set(investment.currency, value);
    //         });
    //     });
    //     return currencys;
    // }

    // public recentDates(): string[] {
    //     const allInvestments: any[] = [];
    //     this.investments.forEach((inv: any[]) => allInvestments.push(...inv));
    //     allInvestments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    //     const lastFive = allInvestments.slice(0, 5);
    //     return lastFive;
    // }
}