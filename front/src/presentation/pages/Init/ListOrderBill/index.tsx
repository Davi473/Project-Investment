const values = {
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
}

function head() {
    return (
        <div style={styles.inputBody}>
            <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <small>Description</small>
            </div>
            <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <small>Amount</small>
            </div>
            <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <small>Date</small>
            </div>
            <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <small>Type</small>
            </div>
        </div>
    )
} 

function body(key: any, value: any) {
    return (
        <div style={{ paddingTop: "5px"}}>
            <div key={key} style={styles.input}>
                <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <small>{value.description.slice(0, 10)}</small>
                </div>
                <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <small>R$ {value.amount}</small>
                </div>
                <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <small>{value.date}</small>
                </div>
                <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <small>{value.type}</small>
                </div>
            </div>
        </div>
    )
}


const ListOrderBill = () => {
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

export default ListOrderBill;

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