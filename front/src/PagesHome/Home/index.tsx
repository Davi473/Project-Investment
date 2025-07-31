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
    <Greeting name={"Fulano"} />,
    <Property />,
    <ListOfWallets />,
    <ListOrderInvestment />,
    <MonthBill />,
    <ListOfBill />,
    <ListOrderBill />
]

const configView = () => {
    return (
        <>
            <TrelloBoard />
        </>
    )
}



export const Home: React.FC<any> = () => {
    const output = outputView()
    const [config, setConfig] = React.useState(false);
    return (
        <>
            <div style={styles.container}>
                <div style={{width: "430px"}}>
                    <NavBar config={config} setConfig={setConfig}/>
                </div>
                <div className="scroll-container" style={{width: "430px", maxHeight: "500px", overflowY: "auto", marginTop: "10px" }}>
                    {
                        config ?
                            configView() 
                        :
                            (<>
                                {output[0]}
                                {output[1]}
                                {output[2]}
                                {output[3]}
                                {output[4]}
                                {output[5]}
                                {output[6]}
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