import { useEffect, useState } from "react";
import { storage } from "../../../../infra/storage/localStorage";

export const ConfigPage = () => {
    const [user, setUser] = useState<any>();

    useEffect(() => {
        const init = async () => {
            const user = await storage.get<any>("user");
            setUser(user);
        };
        init();
    }, []);

    return (
        <div>
            <div className="text-white d-flex flex-column justify-content-evenly p-3 mt-4">
                {/* <small>{day()},</small> */}
                <small>Mr. {user ? user.name.toUpperCase() : null}</small>
            </div>
            <div className="mt-4 mx-auto">
                <button
                    className="btn btn-danger rounded"
                    onClick={() => storage.remove("token")}
                >
                    EXIT
                </button>
            </div>
            <div className="mt-4">
                {/* {output.map(section => (
                    <div key={section.id}>
                        {section.render()}
                    </div>
                ))} */}
            </div>
        </div>
    );
}