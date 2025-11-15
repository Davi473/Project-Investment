import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../../infra/storage/localStorage';

const input = {
    currentMonth: {
        name: "November",
        input: 3500,
        output: 2500,
        currency: "USD"
    },
    months: [
        {
            name: "October",
            input: 3500,
            output: 2500,
            currency: "USD"
        },
        {
            name: "Setember",
            input: 3500,
            output: 2500,
            currency: "USD"
        },
        {
            name: "August",
            input: 3500,
            output: 2500,
            currency: "USD"
        }
    ]
}
export const BillPage = () => {
    const [months, setMounts] = useState<any[]>(input.months);
    const [currentMonth, setCurrentMonth] = useState<any>(input.currentMonth);
    const [loading, setLoading] = useState<boolean>(false);
    const navigator = useNavigate();

    useEffect(() => {
        const init = async () => {
            const token = storage.get<string>("token");
            // Wallets
            const response = await fetch(`http://localhost:3000/wallet/account`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(await response.json());
        };
        init();
    }, []);

    if (loading) {
        return <div style={{ color: 'white', marginTop: 100 }}>Carregando...</div>;
    }

    return (
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
                <div
                    className="d-flex flex-column justify-content-between w-75"
                >
                    <div className="mb-2 text-center">
                        <h4>{currentMonth.name}</h4>
                    </div>

                    <div>
                        <table className="table table-borderless w-100 text-center">
                            <thead>
                                <tr>
                                    <td>Input</td>
                                    <td>Output</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: currentMonth.currency,
                                        }).format(currentMonth.input)}
                                    </td>
                                    <td>
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: currentMonth.currency,
                                        }).format(currentMonth.output)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div
                className="d-flex flex-column p-3 bg-white align-items-center mt-4 w-100"
                style={{
                    border: "none",
                    outline: "none",
                    boxShadow: "2px 2px 5px #222",
                    borderRadius: "20px",
                }}
            >
                <p>Fazer Um Grafico Aqui</p>
            </div>

            {
                months.map(month => (
                    <div
                        className="d-flex flex-column mt-3 p-3 bg-white align-items-center w-100"
                        style={{
                            border: "none",
                            outline: "none",
                            boxShadow: "2px 2px 5px #222",
                            fontSize: "1em",
                            borderRadius: "20px",
                        }}
                        key={month.name}
                    >
                        <div
                            className="d-flex flex-column justify-content-between w-75"
                        >
                            <div className="mb-2 text-center">
                                <h4>{month.name}</h4>
                            </div>

                            <div>
                                <table className="table table-borderless w-100 text-center">
                                    <thead>
                                        <tr>
                                            <td>Input</td>
                                            <td>Output</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {new Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: month.currency,
                                                }).format(month.input)}
                                            </td>
                                            <td>
                                                {new Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: month.currency,
                                                }).format(month.output)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}