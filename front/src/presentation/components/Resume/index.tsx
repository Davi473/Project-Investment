import React from "react";

const Resume: React.FC<any> = ({ value }: any) => {
    return (
        <div className="d-flex flex-column justify-content-evenly">
            <label className="text-white mb-1">{value.title}</label>
            <div 
                // className="d-flex justify-content-around p-2 rounded bg-white"
                className="d-flex justify-content-around p-2 bg-white"
                style={{width: "400px", border: "none", outline: "none", boxShadow: "2px 2px 5px #222", fontSize: "1em", borderRadius: "20px"}}
            >
                <div className="d-flex flex-column">
                    <small>{value.column1}</small>
                    <small>{value.columnValue1}</small>
                </div>
                <div className="d-flex flex-column">
                    <small>{value.column2}</small>
                    <small>{value.columnValue2}</small>
                </div>
                <div className="d-flex flex-column">
                    <small>{value.column3}</small>
                    <small>{value.columnValue3}</small>
                </div>
            </div>
        </div>
    );
};

export default Resume;