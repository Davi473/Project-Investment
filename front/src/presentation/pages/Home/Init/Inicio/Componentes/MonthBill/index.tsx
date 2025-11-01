import Resume from "../../../Component/Resume";

const MonthBill = () => {
    return (
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
    );
};

export default MonthBill;
