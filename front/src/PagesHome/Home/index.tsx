import React from 'react';
import { NavBar } from '../Navbar';
import Greeting from '../Greeting';
import Resume from '../../Component/Resume';
import ResumeWallet from '../../Component/ResumeWallet';
import "./style.css";
import ListOrderInvestment from '../ListOrderInvestment';
import ListOrderBill from '../ListOrderBill';
import { useDragScroll } from '../../Component/useDragScroll';

export const Home: React.FC<any> = () => {
    const scrollRef = useDragScroll();
    const resumeWalletInvestment = {
        title: "Inter",
        column1: "Input Value",
        column2: "Profitability",
        column3: "Current Value",
        columnValue1: "R$ 1000",
        columnValue2: "10%",
        columnValue3: "R$ 1100"
    }
    const resumeWalletInvestments = [resumeWalletInvestment, resumeWalletInvestment, resumeWalletInvestment, resumeWalletInvestment];
    const resumaWalletBill = {
        title: "Inter",
        column1: "Value Entry",
        column2: "Value Output",
        column3: "Current Value",
        columnValue1: "R$ 1000",
        columnValue2: "R$ 900",
        columnValue3: "R$ 100"
    }
    const resumaWalletBills = [resumaWalletBill, resumaWalletBill, resumaWalletBill]
    return (
        <>
            <div style={styles.container}>
                <div style={{width: "430px"}}>
                    <NavBar />
                </div>
                <div className="scroll-container" style={{width: "430px", maxHeight: "400px", overflowY: "auto", marginTop: "10px" }}>
                    <div style={{ width: "420px", marginTop: "100px", marginBottom: "100px"}}>
                        <Greeting name={"Fulano"} />
                    </div>
                    <div>
                        <Resume value={{
                            title: "Property",
                            column1: "Input Value",
                            column2: "Profitability",
                            column3: "Current Value",
                            columnValue1: "R$ 1000",
                            columnValue2: "10%",
                            columnValue3: "R$ 1100"
                        }} />
                    </div>
                    <div style={{paddingTop: "50px"}}>
                        <label style={styles.label}>{"List Of Wallets"}</label>
                        <div ref={scrollRef}
                            className="scroll-container"
                            style={{
                                width: "420px",
                                display: "flex",
                                overflowX: "auto",
                                gap: "16px",
                            }}>
                            {
                                resumeWalletInvestments.map(value => <ResumeWallet value={value}/>)
                            }                         
                        </div>
                    </div>
                    <div style={{paddingTop: "50px"}}>
                        <ListOrderInvestment value={{
                            title: "Order List",
                            colunas: [{ 
                                name: "VALE", category: "Stock", 
                                    quantity: "2.8000", average: "8,8", 
                                    type: "Buy", date: "30/06/2025"
                                }]
                        }}/>
                    </div>
                    <div style={{paddingTop: "50px"}}>
                        <Resume value={{
                            title: "Month Bill",
                            column1: "Value Entry",
                            column2: "Value Output",
                            column3: "Current Value",
                            columnValue1: "R$ 1000",
                            columnValue2: "R$ 900",
                            columnValue3: "R$ 100"
                        }} />
                    </div>
                    <div style={{paddingTop: "50px"}}>
                        <label style={styles.label}>{"List Of Bill"}</label>
                        <div ref={scrollRef}
                            className="scroll-container"
                            style={{
                                width: "420px",
                                display: "flex",
                                overflowX: "auto",
                                gap: "16px",
                            }}>
                            {
                                resumaWalletBills.map(value => <ResumeWallet value={value}/>)
                            }
                        </div>
                    </div>
                    <div style={{paddingTop: "50px"}}>
                        <ListOrderBill value={{
                            title: "Bill List",
                            colunas: [{ 
                                    description: "Compra No Merdado", amount: "1050,34", 
                                    date: "30/06/2025", type: "Income", 
                                }, { 
                                    description: "Compra No Merdado", amount: "1050,34", 
                                    date: "30/06/2025", type: "Income", 
                                }, { 
                                    description: "Compra No Merdado", amount: "1050,34", 
                                    date: "30/06/2025", type: "Income", 
                                }]
                        }}/>
                    </div>
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