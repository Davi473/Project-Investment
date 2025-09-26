import { AccountRepository } from "../../application/repositories/AccountRepository";
import { Account } from "../../domain/entity/Account";


export class InMemoryAccountRepository implements AccountRepository {
    private memory: Account[] = [];

    public async save(account: Account): Promise<void> {
        this.memory.push(account);
    }

    public async findByIdWallet(idWallet: string): Promise<Account[] | null> {
        return this.memory.filter((account) => account.idWallet === idWallet);
    }
}