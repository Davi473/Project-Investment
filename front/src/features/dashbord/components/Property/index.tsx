import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Property = ({ value }: any) => {
    return (
        <div className="d-flex flex-column justify-content-evenly">
            < label className="text-white mb-1" > {"Property"}</label >
            <div
                className="d-flex justify-content-around p-2 bg-white"
                style={{ border: "none", outline: "none", boxShadow: "2px 2px 5px #222", fontSize: "1em", borderRadius: "20px" }}
            >
                <div className="d-flex flex-column">
                    <small>Input Value</small>
                    <small> {!value.currency ? null : new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: value.currency,
                    }).format(value.amount)}</small>
                </div>

                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id="tooltip-top">
                            {!value.currency ? null : new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: value.currency,
                            }).format((value.currencyValue - value.amount))}
                        </Tooltip>
                    }
                >
                    <div className="d-flex flex-column">
                        <small>Profitability</small>
                        <small>{!value.amount ? 0 : (((value.currencyValue * 100) / value.amount) - 100).toFixed(2)}%</small>
                    </div>
                </OverlayTrigger>
                <div className="d-flex flex-column">
                    <small>Current Value</small>
                    <small>{!value.currency ? null : new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: value.currency,
                    }).format(value.currencyValue)}</small>
                </div>
            </div>
        </div >
    );
};

export default Property;
