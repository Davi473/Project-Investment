import Resume from "../../../../Component/Resume";

type Input = {
    inputValue: number,
    
}

const Property = ({values}: any) => {
    return (
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
    );
};

export default Property;
