import React from 'react';
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


const outputView = () =>  [
    { id: 1, text: "Property", item: <Property /> },
    { id: 2, text: "List Of Wallets", item: <ListOfWallets /> },
    { id: 3, text: "List Order Investment", item: <ListOrderInvestment />, },
    { id: 4, text: "Month Bill", item: <MonthBill /> },
    { id: 5, text: "List Of Bill", item: <ListOfBill /> },
    { id: 6, text: "List Order Bill", item: <ListOrderBill /> },
]

export const Home: React.FC<any> = () => {
    const [output, setOutput] = React.useState(outputView());
    const [config, setConfig] = React.useState(false);

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