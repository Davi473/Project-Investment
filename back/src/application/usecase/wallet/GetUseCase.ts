import WalletRepository from "../../repositories/WalletRepository";
import UseCase from "../UseCase";

export class GetUseCase implements UseCase {
    constructor(
        private walletRepository: WalletRepository,
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        const { id, type } = input;
        const wallets = await this.walletRepository.findByIdUser(id);
        return {
            wallets: wallets
                ? wallets
                    .filter(wallet => wallet.type === type)
                    .map(wallet => ({
                        id: wallet.id,
                        name: wallet.name.toString(),
                        currency: wallet.currency.toString(),
                    }))
                : []
        };
    }
}

type Input = {
    id: string,
    nickname: string
    type: "a" | "i"
}   

type Output = {
    wallets: any,
};