import { useState } from "react";
import { storage } from "../../infra/storage/localStorage";
import { useNavigate } from "react-router-dom";

export const WalletCreate = () => {

    const [name, setName] = useState<string>("");
    const [currency, setCurrency] = useState<string>("");
    const navigator = useNavigate();

    const create = async () => {
        try {
            const user: any = storage.get("user")
            await fetch(`http://localhost:3000/api/wallet/investment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${storage.get("token")}`
                }, body: JSON.stringify({ idUser: user.id, currency, name })
            });
            navigator("/home")
        } catch (e: any) {
            console.error(e.response.data.message);
        }
    }
    return (
        <div className="d-flex flex-column align-items-center bg-dark vh-100">
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