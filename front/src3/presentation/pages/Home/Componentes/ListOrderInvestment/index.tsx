function head() {
    return (
        <div className="text-white" style={styles.inputBody}>
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
    return (
        <div key={key} style={{ paddingTop: "5px" }}>
            <div style={styles.input} className="bg-white">
                <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <small>{value.nickname.split('.')[0]}</small>
                </div>
                <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <small>{value.category.toUpperCase()}</small>
                </div>
                <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <small>{
                        Number.isInteger(value.quantity)
                            ? value.quantity
                            : value.quantity.toFixed(5)
                    }</small>
                </div>
                <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <small>R$ {value.average}</small>
                </div>
                <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <small>{value.type}</small>
                </div>
                <div style={{ minWidth: "65px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <small>{new Date(value.date).toLocaleDateString("pt-BR")}</small>
                </div>
            </div>
        </div>
    )
}


const ListOrderInvestment = ({ values, title }: any) => {
    return (
        <div style={{ paddingTop: "50px" }}>
            <div style={styles.container}>
                <label style={styles.label} className="text-white">{title}</label>
                {head()}
                {values.map((values: any, key: any) => body(key, values))}
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