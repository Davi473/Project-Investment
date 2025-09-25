import { authApi } from "../../infra/api/authApi";

interface RegisterInput {
    name: string;
    email: string;
    password: string;
}

export async function registerUseCase(data: RegisterInput) {
    return await authApi.register(data);
}
