import React, { useEffect, useState } from 'react';
import { NavBar } from '../Navbar';
import Greeting from './Componentes/Greeting';
import "./style.css";
import ListOrderInvestment from '../ListOrderInvestment';
import ListOrderBill from '../ListOrderBill';
import TrelloBoard from './TrelloBoard';
import Property from './Componentes/Property';
import ListOfWallets from './Componentes/ListOfWallets';
import MonthBill from './MonthBill';
import ListOfBill from './Componentes/ListaOfBill';

export const Home: React.FC<any> = () => {
    const [config, setConfig] = React.useState(false);
    const [wallets, setWallets] = React.useState<any>();

    const [propertyData, setPropertyData] = useState<any>();

    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:3000/wallet`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }});
            console.log(await response.json());
            setWallets(await response.json());
        };
        init();
    }, [wallets]);

    const outputView =  [
        { id: 1, text: "Property", item: <Property /> },
        { id: 2, text: "List Of Wallets", item: <ListOfWallets wallets={wallets} /> },
        { id: 3, text: "List Order Investment", item: <ListOrderInvestment />, },
        // { id: 4, text: "Month Bill", item: <MonthBill /> },
        // { id: 5, text: "List Of Bill", item: <ListOfBill  /> },
        // { id: 6, text: "List Order Bill", item: <ListOrderBill /> },
    ]

    const [output, setOutput] = useState(outputView);

    const configView = () => {
        return (
            <>
                <TrelloBoard output={output} setOutput={setOutput} />
            </>
        )
    }
    return (
        <>
            <div style={styles.container}>
                <div style={{width: "430px"}}>
                    <NavBar config={config} setConfig={setConfig}/>
                </div>
                <div className="scroll-container" style={{width: "430px", overflowY: "auto", marginTop: "10px", marginBottom: "50px"}}>
                    {
                        config ?
                            configView() 
                        :
                            (<>
                                <Greeting name={"Fulano"} />
                                {output[0].item}
                                {output[1].item}
                                {output[2].item}
                                {/* {output[3].item}
                                {output[4].item}
                                {output[5].item} */}
                            </>)
                    }
                </div>
            </div>
        </>
    );
};


const styles: any = {
    container: {
        backgroundColor: "#3a3a3a",
        height: "100vh",
        display: "flex",
        flexDirection: "column", 
        alignItems: "center"  
    },
};