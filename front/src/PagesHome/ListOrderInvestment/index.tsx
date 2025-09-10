import { useEffect, useState } from "react";

const values = {
    title: "Order List",
    colunas: [{ 
        name: "VALE", category: "Stock", 
            quantity: "2.8000", average: "8,8", 
            type: "Buy", date: "30/06/2025"
        }]
}

function head() {
    return (
        <div style={styles.inputBody}>
            <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <small>Name</small>
            </div>
            <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <small>Category</small>
            </div>
            <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <small>Quantity</small>
            </div>
            <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <small>Average</small>
            </div>
            <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <small>Type</small>
            </div>
            <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <small>Date</small>
            </div>
        </div>
    )
} 

function body(key: any, value: any) {
    console.log(value)
    return (
        <div key={key} style={{ paddingTop: "5px"}}>
            <div style={styles.input}>
                <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <small>{value.name}</small>
                </div>
                <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <small>{value.category}</small>
                </div>
                <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <small>{value.quantity}</small>
                </div>
                <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <small>R$ {value.average}</small>
                </div>
                <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <small>{value.type}</small>
                </div>
                <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <small>{value.date}</small>
                </div>
            </div>
        </div>
    )
}


const ListOrderInvestment = () => {
    const [listInvestment, setListInvestment] = useState<any>();
    // useEffect(() => {
    //     const init = async () => {
    //         const token = localStorage.getItem("token");
    //         const response = await fetch("http://localhost:3000/investment", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         });
    //         setListInvestment(await response.json());
    //     }
    //     init();
    // },[listInvestment]);

    return (
        <div style={{paddingTop: "50px"}}>
            <div style={styles.container}>
                <label style={styles.label}>{values.title}</label>
                {head()}
                {values.colunas.map((values: any, key: any) => body(key, values))}
            </div>
        </div>
    );
};

export default ListOrderInvestment;

const styles: any = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
    },
    input: {
        width: "400px",
        padding: "10px",
        borderRadius: "15px",
        border: "none",
        outline: "none",
        boxShadow: "2px 2px 5px #222",
        backgroundColor: "#d3d3d3",
        fontSize: "1em",
        display: "flex",
        justifyContent: "space-around"
    },
    inputBody: {
        width: "400px",
        paddingTop: "10px",
        paddingLeft: "10px",
        paddingRigth: "10px",
        border: "none",
        outline: "none",
        fontSize: "1em",
        display: "flex",
        justifyContent: "space-around"
    }
}