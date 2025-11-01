import { useDragScroll } from "../../../../../../components/useDragScroll";

const resumaWalletBill = {
    title: "Inter",
    column1: "Value Entry",
    column2: "Value Output",
    column3: "Current Value",
    columnValue1: "R$ 1000",
    columnValue2: "R$ 900",
    columnValue3: "R$ 100"
}
const values = [resumaWalletBill, resumaWalletBill, resumaWalletBill]

const ListOfBill = () => {
    return (
        <div style={{ paddingTop: "50px" }}>
            <label className="text-white mb-1" >List Of Bill</label>
            <div ref={useDragScroll()}
                className="scroll-container d-flex overflow-auto"
                style={{ width: "420px", gap: "16px" }}
            >
                {
                    values.map((value: any, key: any) => (
                        <div key={key} className="d-flex flex-column justify-content-around">
                            <div
                                className="d-flex flex-column justify-content-around p-2"
                                style={{ width: "100px", height: "130px", borderRadius: "15px", border: "none", outline: "none", boxShadow: "2px 2px 5px #222", backgroundColor: "#d3d3d3", fontSize: "1em" }}
                            >
                                <div className="d-flex flex-column align-items-center">
                                    <small>{value.title}</small>
                                </div>
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
                    ))
                }
                <div className="d-flex flex-column justify-content-around">
                    <div
                        className="d-flex flex-column justify-content-around align-items-center bg-white"
                        style={{
                            width: "100px", height: "130px", padding: "10px",
                            borderRadius: "15px", border: "none", outline: "none",
                            boxShadow: "2px 2px 5px #222", fontSize: "3em",
                            color: "#555", cursor: "pointer", userSelect: "none",
                        }}
                    >
                        +
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListOfBill;
