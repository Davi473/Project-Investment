import WalletInvestmentRepository from "../../repositories/WalletInvestmentRepository";
import UseCase from "../UseCase";

export class GetUseCase implements UseCase {
    constructor(
        private walletInvestmentRepository: WalletInvestmentRepository,
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        const { idUser } = input;
        const wallets = await this.walletInvestmentRepository.findByIdUser(idUser);
        return { wallets: wallets ? wallets.map(wallet => ({
                id: wallet.id,
                name: wallet.name.toString(),
                currency: wallet.currency.toString(),
            })
        ): [] };
    }
}

type Input = {
    idUser: string,
    nickname: string
    currency?: string,
}   

type Output = {
    wallets: any,
};