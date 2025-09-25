import { authApi } from "../../infra/api/authApi";

interface LoginInput {
    email: string;
    password: string;
}

export async function loginUseCase(data: LoginInput) {
    return await authApi.login(data);
}
