import WalletInvestmentRepository from "../../application/repositories/WalletInvestmentRepository";
import { Wallet } from "../../domain/entity/Wallet";

export class InMemoryWalletInvestmentRepository implements WalletInvestmentRepository {
    private wallets: Wallet[] = [];

    async save(wallet: Wallet): Promise<void> 
    {
        this.wallets.push(wallet);
    }

    async findByIdUser(idUser: string): Promise<Wallet[] | null> 
    {
        return this.wallets.filter((wallet) => wallet.idUser == idUser);
    }
}
