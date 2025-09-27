import { UserRepository } from "../../repositories/UserRepository";
import UseCase from "../UseCase";

export class GetUser implements UseCase {
    constructor(
        private userRepository: UserRepository
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        const { id } = input;
        const existingUser = await this.userRepository.findById(id);
        if (existingUser === null) throw new Error("Usuário não encontrado");
        return {"menssage": "Seja Bem-vindo", user: {
            id: existingUser.id,
            name: existingUser.nickname,
            email: existingUser.email
        }};
    }
}

type Input = {
    id: string
}   

type Output = {
    menssage: string,
    user: any
};