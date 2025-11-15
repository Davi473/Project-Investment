import { useState } from "react";

interface InputProps {
    label?: string;
    type?: string;
    value: string;
    placeholder?: string;
    onChange: (e: any) => void;
    error?: string;
}

export const Input = ({
    label,
    type = "text",
    value,
    placeholder,
    onChange,
    error,
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="text-start w-100">
            {
                error ?
                    <label className="form-label text-danger ms-2">{error}</label> :
                    <label className="form-label ms-2">{label}</label>
            }
            <div className="position-relative w-100" style={{ maxWidth: "400px" }}>
                <input
                    type={type === "password" ? showPassword ? "text" : "password" : type}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className="form-control rounded-pill shadow-sm ps-4 pe-5 bg-light border-0"
                />
                {type === "password" && (
                    <button
                        type="button"
                        className="btn position-absolute top-50 end-0 translate-middle-y pe-3 border-0"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <i className="bi bi-eye"></i>
                        ) : (
                            <i className="bi bi-eye-slash"></i>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};
