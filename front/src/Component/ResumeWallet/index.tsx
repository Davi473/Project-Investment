import { useDragScroll } from "../useDragScroll";
import React from "react";

const ResumeWallet: React.FC<any> = ({ values, input }: any) => {
    console.log(values, "values");
    return (
        <>
            <label style={styles.label}>{input}</label>
            <div ref={useDragScroll()}
                className="scroll-container"
                style={{
                    width: "420px",
                    display: "flex",
                    overflowX: "auto",
                    gap: "16px",
                }}>
                {
                    values.map((value: any, key: any) => {
                        return (
                            <div key={key} style={styles.container}>
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
                        )
                    })
                }          
                <div style={styles.container}>
                    <div style={{
                        ...styles.input,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "3em",
                        color: "#555",
                        cursor: "pointer",
                        userSelect: "none"
                    }}>
                        +
                    </div>
                </div>
            </div>
        </>
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