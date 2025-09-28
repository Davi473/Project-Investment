import { authApi } from "../../infra/api/authApi";

export async function getUseCase() {
    return await authApi.get();
}
