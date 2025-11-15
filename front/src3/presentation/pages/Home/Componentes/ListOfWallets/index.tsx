import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const ListOfWallets = ({ wallets, investments }: any) => {
    const [investment, setInvestment] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigator = useNavigate();
    useEffect(() => {
        const init = async () => {
            const investment: any[] = [];
            for (const wallet of wallets) {
                const valueWallet = investments.wallet(wallet.name, wallet.value);
                investment.push({
                    id: wallet.id,
                    title: wallet.name,
                    amountInvested: new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: wallet.currency,
                    }).format(valueWallet.amount),
                    property: new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: wallet.currency,
                    }).format((valueWallet.currencyValue - valueWallet.amount)),
                    columnValue2: valueWallet.amount === 0 ? 0 : (((valueWallet.currencyValue * 100) / valueWallet.amount) - 100).toFixed(2),
                    currentValue: new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: wallet.currency,
                    }).format(valueWallet.currencyValue)
                });
            }
            setInvestment(investment);
            setLoading(false);
        };
        init();
    }, [wallets]);

    if (loading) {
        return <div style={{ color: 'white', marginTop: 100 }}>Carregando...</div>;
    }

    return (
        <div style={{ paddingTop: "50px" }}>
            <div>
                <label className="text-white mb-1" >List Of Wallets</label>
                <div
                    // ref={useDragScroll()}
                    className="scroll-container d-flex overflow-auto"
                    style={{ width: "420px", gap: "16px" }}
                >

                    {
                        investment.map((value: any, key: any) => (
                            <div
                                key={key}
                                className="d-flex flex-column justify-content-around"
                                onClick={() => navigator(`/wallet/${value.id}?name=${value.title}`)}
                            >
                                <div
                                    className="d-flex flex-column justify-content-around p-2 bg-white"
                                    style={{ width: "120px", height: "160px", borderRadius: "15px", border: "none", outline: "none", boxShadow: "2px 2px 5px #222", fontSize: "1em" }}
                                >
                                    <div className="d-flex flex-column align-items-center">
                                        <small>{value.title}</small>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <small>Input Value</small>
                                        <small>{value.amountInvested}</small>
                                    </div>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id="tooltip-top">
                                                {(value.property)}
                                            </Tooltip>
                                        }
                                    >
                                        <div className="d-flex flex-column text-start" style={{ cursor: "pointer" }}>
                                            <small>Profitability</small>
                                            <small>{value.columnValue2}%</small>
                                        </div>
                                    </OverlayTrigger>
                                    <div className="d-flex flex-column">
                                        <small>Current Value</small>
                                        <small>{value.currentValue}</small>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div 
                        className="d-flex flex-column justify-content-around"
                        onClick={() => navigator("wallet/create")}
                    >
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
        </div>
    );
};

export default ListOfWallets;


function useDragScroll() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        const mouseDown = (e: MouseEvent) => {
            isDown = true;
            startX = e.pageX - el.offsetLeft;
            scrollLeft = el.scrollLeft;
        };

        const mouseLeave = () => {
            isDown = false;
        };

        const mouseUp = () => {
            isDown = false;
        };

        const mouseMove = (e: MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - el.offsetLeft;
            const walk = (x - startX) * 1; // scroll speed
            el.scrollLeft = scrollLeft - walk;
        };

        el.addEventListener("mousedown", mouseDown);
        el.addEventListener("mouseleave", mouseLeave);
        el.addEventListener("mouseup", mouseUp);
        el.addEventListener("mousemove", mouseMove);

        return () => {
            el.removeEventListener("mousedown", mouseDown);
            el.removeEventListener("mouseleave", mouseLeave);
            el.removeEventListener("mouseup", mouseUp);
            el.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    return ref;
}