import { useEffect, useState } from "react";
import ResumeWallet from "../../../../Component/ResumeWallet";

// const resumeWalletInvestment = {
//     title: "Inter",
//     column1: "Input Value",
//     column2: "Profitability",
//     column3: "Current Value",
//     columnValue1: "R$ 1000",
//     columnValue2: "10%",
//     columnValue3: "R$ 1100"
// }
// const resumeWalletInvestments = [resumeWalletInvestment];

const ListOfWallets = ({wallets}: any) => {
    const [investment, setInvestment] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const init = async () => {
            if (!wallets || wallets.length === 0) {
                setLoading(false);
                return;
            }
            const token = localStorage.getItem("token");
            const investments: any[] = [];
            for (const wallet of wallets) {
                const response = await fetch(`http://localhost:3000/investment/${wallet.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.log(wallet);
                const responseData = await response.json();
                const formatado = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: wallet.currency,
                }).format(0);
                investments.push({ 
                    // ...wallet, stock: responseData 
                    title: wallet.name,
                    column1: "Input Value",
                    column2: "Profitability",
                    column3: "Current Value",
                    columnValue1: formatado,
                    columnValue2: "0%",
                    columnValue3: formatado
                });
            }
            setInvestment(investments);
            setLoading(false);
        };
        init();
    }, [wallets]);

    if (loading) {
        return <div style={{ color: 'white', marginTop: 100 }}>Carregando...</div>;
    }

    return (
        <div style={{paddingTop: "50px"}}>
            <ResumeWallet values={investment} input={"List Of Wallets"}/>
        </div>
    );
};

export default ListOfWallets;
