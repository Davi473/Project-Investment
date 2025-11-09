import { useEffect, useState } from "react";
import { storage } from "../../infra/storage/localStorage";
import { Link, useLocation, useParams } from "react-router-dom";

export const WalletInvestment = () => {
    const { id } = useParams();
    const [investments, setInvestments] = useState<Investment>(new Investment());
    const [loading, setLoading] = useState<boolean>(true);
    const [ativo, setAtivo] = useState("a");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");
    const [config, setConfig] = useState(false);
    const togglePopup = () => setConfig((prev) => !prev)

    const [abertos, setAbertos] = useState<{ [key: string]: boolean }>({});

    const toggleCategoria = (name: string) => {
        setAbertos((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };


    useEffect(() => {
        const fetchWallets = async () => {
            try {
                const investments = new Investment();
                const token = storage.get<string>("token");
                const response = await fetch(`http://localhost:3000/investment/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
                const responseDate = await response.json();
                for (const investment of responseDate.investments) {
                    investments.add(investment);
                }
                setInvestments(investments);
            } catch (e) {
                console.error("Erro no Servidor");
            }
            setLoading(false);
        };
        fetchWallets();
    }, []);

    if (loading) {
        return <div style={{ color: 'white', marginTop: 100 }}>Carregando...</div>;
    }

    const line = {
        height: "4px",
        width: "20px",
        backgroundColor: "#111",
        borderRadius: "3px",
        transition: "all 0.3s ease-in-out",
        boxShadow: "0 1px 2.5px rgba(0, 0, 0, 0.3)",
        transformOrigin: "center",
    };

    return (
        <div className="d-flex flex-column align-items-center bg-dark vh-100">
            <header className="mt-3 w-50">
                <div
                    className="mt-3 w-100 p-2 rounded-4 border-0 shadow-sm bg-light d-flex justify-content-between"
                    style={{ height: "35px", fontSize: "1em" }}
                >
                    <nav className="d-flex align-items-center justify-content-center">
                        <Link
                            to="/home/inicio"
                            className={`text-center ms-2 text-decoration-none fw-bolder ${ativo === "a" ? "text-secondary" : "text-dark"}`}
                            onClick={() => setAtivo("a")}
                        >
                            HOME
                        </Link>
                        <Link
                            to="/home/investment"
                            className={`text-center ms-2 text-decoration-none fw-bolder ${ativo === "b" ? "text-secondary" : "text-dark"}`}
                            onClick={() => setAtivo("b")}
                        >
                            INVESTMENT
                        </Link>
                        <Link
                            to="/home/bill"
                            className={`text-center ms-2 text-decoration-none fw-bolder ${ativo === "c" ? "text-secondary" : "text-dark"}`}
                            onClick={() => setAtivo("c")}
                        >
                            BILL
                        </Link>
                    </nav>
                    <div className="d-flex align-items-center justify-content-center me-2">
                        <button
                            type="button"
                            className="d-flex flex-column justify-content-evenly p-2 position-relative bg-transparent border-0"
                            style={{ height: "20px", width: "20px", zIndex: 1001 }}
                            onClick={togglePopup}
                            aria-label="Configurações"
                        >
                            <div
                                className="position-absolute rounded"
                                style={{ ...line, transform: config ? "rotate(45deg)" : "rotate(0deg) translateY(-8px)" }}
                            />
                            <div
                                className="position-absolute rounded"
                                style={{ ...line, ...(config ? { opacity: 0 } : { opacity: 1, transform: "translateY(0)" }) }}
                            />
                            <div
                                className="position-absolute rounded"
                                style={{ ...line, transform: config ? "rotate(-45deg)" : "rotate(0deg) translateY(8px)" }}
                            />
                        </button>
                    </div>
                </div>
            </header>
            <main
                className="scroll-container overflow-auto d-flex flex-column align-items-center bg-dark flex-grow-1 mt-3 w-50 pb-4"
            >
                <div
                    className="d-flex flex-column align-items-center w-100"
                >
                    <div
                        className="d-flex flex-column p-3 bg-white align-items-center w-100"
                        style={{
                            border: "none",
                            outline: "none",
                            boxShadow: "2px 2px 5px #222",
                            fontSize: "1em",
                            borderRadius: "20px",
                        }}
                    >
                        <div className="w-75 d-flex justify-content-between align-items-center">
                            <p className="mb-0">{name?.toUpperCase()}</p>
                            <Link 
                                to={"investment/create"}
                                className="btn btn-outline-secondary btn-sm rounded-pill"
                            >
                                <i className="bi bi-plus-lg text-black me-2"></i>
                                Adicionar
                            </Link>
                        </div>
                        {[...investments.currency().entries()].map(([currency, value]) => (
                            <div
                                className="d-flex flex-row justify-content-between w-75"
                                key={value.id}
                                style={{
                                    borderBottom: "1px solid #000",
                                    paddingBottom: "3px",
                                    marginBottom: "4px"
                                }}
                            >
                                <small>{currency}</small>
                                <span>
                                    {
                                        new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: currency,
                                        }).format(value)
                                    }
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* <div
                        className="d-flex flex-column p-3 bg-white align-items-center mt-4 w-100"
                        style={{
                            border: "none",
                            outline: "none",
                            boxShadow: "2px 2px 5px #222",
                            borderRadius: "20px",
                        }}
                    >
                        <p>Fazer Um Grafico Aqui</p>
                    </div> */}

                    {investments.category().map((category: any) => (
                        <div
                            key={category.name}
                            className="d-flex flex-column bg-white align-items-center mt-4 w-100"
                            style={{
                                border: "none",
                                outline: "none",
                                boxShadow: "2px 2px 5px #222",
                                borderRadius: "20px",
                            }}
                        >
                            <div
                                className="d-flex align-items-center p-2 text-center w-75 border-bottom"
                                style={{ gap: "8px" }}
                            >
                                <div className="mb-0 flex-fill">
                                    <button
                                        className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                                        style={{ width: "30px", height: "30px", flexShrink: 0 }}
                                        onClick={() => toggleCategoria(category.name)}
                                    >
                                        <i
                                            className={`bi bi-chevron-${abertos[category.name] ? "up" : "down"}`}
                                        ></i>
                                    </button>
                                </div>

                                <p className="mb-0 fw-bold flex-fill text-start">
                                    {category.name.toUpperCase()}
                                </p>
                                <p className="mb-0 flex-fill">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: category.currency,
                                    }).format(category.value)}
                                </p>
                                <p className="mb-0 flex-fill">
                                    {(((category.value * 100) / category.amount) - 100).toFixed(2)} %
                                </p>
                            </div>

                            {abertos[category.name] && (
                                <div className="d-flex flex-row justify-content-between w-100 mt-2 mb-3">
                                    <table className="table w-100 text-center">
                                        <thead>
                                            <tr>
                                                <td>Currency</td>
                                                <td>Input</td>
                                                <td>Quantity</td>
                                                <td>Amount</td>
                                                <td>Profitability</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {investments.categories.get(category.name).list.map(
                                                (investment: any) => (
                                                    <tr key={investment.nickname}>
                                                        <td>{investment.nickname.split('.')[0]}</td>
                                                        <td>
                                                            {new Intl.NumberFormat("en-US", {
                                                                style: "currency",
                                                                currency: investment.currency,
                                                            }).format((investment.average * investment.quantity))}
                                                        </td>
                                                        <td>
                                                            {
                                                                Number.isInteger(investment.quantity)
                                                                    ? investment.quantity
                                                                    : investment.quantity.toFixed(5)
                                                            }
                                                        </td>
                                                        <td>
                                                            {new Intl.NumberFormat("en-US", {
                                                                style: "currency",
                                                                currency: investment.currency,
                                                            }).format((investment.currentValue * investment.quantity))}
                                                        </td>
                                                        <td>
                                                            {((((investment.currentValue * investment.quantity) * 100) / (investment.average * investment.quantity)) - 100).toFixed(2)} %
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

class Investment {
    public investments: Map<string, any> = new Map();
    public categories: Map<string, any> = new Map();

    public add(investment: any): void {
        this.investments.set(investment.nickname, investment);
    }

    public currency(): Map<string, any> {
        const currency: Map<string, any> = new Map();
        this.investments.forEach((investment: any) => {
            if (!currency.get(investment.currency))
                currency.set(investment.currency, 0);
            let value = currency.get(investment.currency);
            value += (investment.currentValue * investment.quantity);
            currency.set(investment.currency, value);
        });
        return currency;
    }

    public category(): string[] {
        this.categories = new Map();
        this.investments.forEach((investment: any) => {
            if (!this.categories.get(investment.category))
                this.categories.set(investment.category, { list: [], currency: investment.currency });
            const value: any = this.categories.get(investment.category);
            value.list.push(investment);
        });
        const listCategories: any[] = [];
        this.categories.forEach((category: any, index: any) => {
            let value = 0;
            let amount = 0;
            for (const investment of category.list) {
                value += (investment.currentValue * investment.quantity);
                amount += (investment.average * investment.quantity);
            }
            listCategories.push({ name: index, value, amount, currency: category.currency });
        });
        return listCategories;
    }
}