
const Property = () => {
    return (
        <div className="d-flex flex-column justify-content-evenly">
            <label className="text-white mb-1">{"Property"}</label>
            <div 
                className="d-flex justify-content-around p-2 bg-white"
                style={{width: "400px", border: "none", outline: "none", boxShadow: "2px 2px 5px #222", fontSize: "1em", borderRadius: "20px"}}
            >
                <div className="d-flex flex-column">
                    <small>Input Value</small>
                    <small>R$ {1000}</small>
                </div>
                <div className="d-flex flex-column">
                    <small>Profitability</small>
                    <small>{10} %</small>
                </div>
                <div className="d-flex flex-column">
                    <small>Current Value</small>
                    <small>R$ {1100}</small>
                </div>
            </div>
        </div>
    );
};

export default Property;
