import { useState } from "react";
import { storage } from "../../infra/storage/localStorage";
import { useNavigate, useParams } from "react-router-dom";

export const CreateInvestment = () => {
    const { id } = useParams();
    const [name, setName] = useState<string>("");
    const [currency, setCurrency] = useState<string>("");
    const [category, setCategory] = useState<string>();
    const [average, setAverage] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(0);
    const [type, setType] = useState<string>();
    const [date, setDate] = useState<any>(new Date());
    const navigator = useNavigate();

    const create = async () => {
        try {
            await fetch(`http://localhost:3000/api/investment/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${storage.get("token")}`
                }, body: JSON.stringify({ idWallet: id, currency, name, category, average: Number(average), quantity: Number(quantity), buy: type === "buy", created: date })
            });
            navigator("/home");
        } catch (e: any) {
            console.error(e.response.data.message);
        }
    }
    return (
        <div className="d-flex flex-column align-items-center bg-dark vh-100 mt-4">
            <div
                className="d-flex flex-column align-items-center w-100"
            >
                <div className="text-start mt-2">
                    <label className="form-label text-white ms-2">Name Wallet</label>
                    <div className="position-relative w-100">
                        <input
                            type="text"
                            placeholder="Enter name wallet"
                            className="form-control rounded-pill shadow-sm bg-light border-0 w-100"
                            onChange={(e: any) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                </div>

                <div className="text-start mt-2">
                    <label className="form-label text-white ms-2">Category</label>
                    <div className="position-relative w-100">
                        <input
                            type="text"
                            placeholder="Enter name wallet"
                            className="form-control rounded-pill shadow-sm bg-light border-0 w-100"
                            onChange={(e: any) => setCategory(e.target.value)}
                            value={category}
                        />
                    </div>
                </div>

                <div className="text-start mt-2">
                    <label className="form-label text-white ms-2">Currency</label>
                    <div className="position-relative w-100">
                        <input
                            type={"text"}
                            placeholder="Enter Currency"
                            className="form-control rounded-pill shadow-sm bg-light border-0 w-100"
                            onChange={(e: any) => setCurrency(e.target.value)}
                            value={currency}
                        />
                    </div>
                </div>

                <div className="text-start mt-2">
                    <label className="form-label text-white ms-2">Average</label>
                    <div className="position-relative w-100">
                        <input
                            type={"number"}
                            placeholder="Enter Currency"
                            className="form-control rounded-pill shadow-sm bg-light border-0 w-100"
                            onChange={(e: any) => setAverage(e.target.value)}
                            value={average}
                        />
                    </div>
                </div>

                <div className="text-start mt-2">
                    <label className="form-label text-white ms-2">Quantity</label>
                    <div className="position-relative w-100">
                        <input
                            type={"number"}
                            placeholder="Enter Currency"
                            className="form-control rounded-pill shadow-sm bg-light border-0 w-100"
                            onChange={(e: any) => setQuantity(e.target.value)}
                            value={quantity}
                        />
                    </div>
                </div>

                <div className="text-start mt-2">
                    <label className="form-label text-white ms-2">Type</label>
                    <div className="position-relative w-100">
                        <input
                            type={"text"}
                            placeholder="Enter Currency"
                            className="form-control rounded-pill shadow-sm bg-light border-0 w-100"
                            onChange={(e: any) => setType(e.target.value)}
                            value={type}
                        />
                    </div>
                </div>

                <div className="text-start mt-2">
                    <label className="form-label text-white ms-2">Date</label>
                    <div className="position-relative w-100">
                        <input
                            type={"date"}
                            placeholder="Enter Currency"
                            className="form-control rounded-pill shadow-sm bg-light border-0 w-100"
                            onChange={(e: any) => setDate(e.target.value)}
                            value={date}
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <input
                        type="button"
                        value="Enter"
                        className="btn btn-secondary rounded-pill shadow px-3 py-2 fw-bold opacity-100 hover-opacity-75"
                        onClick={create}
                    />
                </div>
            </div>
        </div>
    );
}