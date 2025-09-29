import { useEffect, useRef, useState } from "react";

// const resumeWalletInvestment = {
//     title: "Inter",
//     column1: "Input Value",
//     column2: "Profitability",
//     column3: "Current Value",
//     columnValue1: "R$ 1000",
//     columnValue2: "10%",
//     columnValue3: "R$ 1100"
// }
// const resumeWalletInvestments = [resumeWalletInvestment];

const ListOfWallets = ({ wallets }: any) => {
    const [investment, setInvestment] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const init = async () => {
            if (!wallets || wallets.length === 0) {
                setLoading(false);
                return;
            }
            const token = localStorage.getItem("token");
            const investments: any[] = [];
            for (const wallet of wallets) {
                const response = await fetch(`http://localhost:3000/investment/${wallet.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                console.log(wallet);
                const responseData = await response.json();
                const formatado = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: wallet.currency,
                }).format(0);
                investments.push({
                    // ...wallet, stock: responseData 
                    title: wallet.name,
                    columnValue1: formatado,
                    columnValue2: "0%",
                    columnValue3: formatado
                });
            }
            setInvestment(investments);
            setLoading(false);
        };
        init();
    }, []);

    if (loading) {
        return <div style={{ color: 'white', marginTop: 100 }}>Carregando...</div>;
    }

    return (
        <div style={{ paddingTop: "50px" }}>
            {/* <ResumeWallet values={[]} input={"Test"} /> */}
            <div>
                <label className="text-white mb-1" >List Of Wallets</label>
                <div 
                    // ref={useDragScroll()}
                    className="scroll-container d-flex overflow-auto"
                    style={{ width: "420px", gap: "16px" }}
                >
                    {
                        investment.map((value: any, key: any) => (
                            <div key={key} className="d-flex flex-column justify-content-around">
                                <div
                                    className="d-flex flex-column justify-content-around p-2"
                                    style={{ width: "100px", height: "130px", borderRadius: "15px", border: "none", outline: "none", boxShadow: "2px 2px 5px #222", backgroundColor: "#d3d3d3", fontSize: "1em" }}
                                >
                                    <div className="d-flex flex-column align-items-center">
                                        <small>{value.title}</small>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <small>Input Value</small>
                                        <small>{value.columnValue1}</small>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <small>Profitability</small>
                                        <small>{value.columnValue2}</small>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <small>Current Value</small>
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