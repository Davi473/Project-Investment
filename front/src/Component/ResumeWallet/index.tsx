import React from "react";

const ResumeWallet: React.FC<any> = ({ value }: any) => {
    return (
        <div style={styles.container}>
            <div style={styles.input}>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <small>{value.title}</small>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <small>{value.column1}</small>
                    <small>{value.columnValue1}</small>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <small>{value.column2}</small>
                    <small>{value.columnValue2}</small>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <small>{value.column3}</small>
                    <small>{value.columnValue3}</small>
                </div>
            </div>
        </div>
    );
};

export default ResumeWallet;

const styles: any = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    input: {
        width: "100px",
        height: "130px",
        padding: "10px",
        borderRadius: "15px",
        border: "none",
        outline: "none",
        boxShadow: "2px 2px 5px #222",
        backgroundColor: "#d3d3d3",
        fontSize: "1em",
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column"
    }
}