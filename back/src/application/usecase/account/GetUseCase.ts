import UseCase from "../UseCase";
import { AccountRepository } from "../../repositories/AccountRepository";
import { Account } from "../../../domain/entity/Account";

export class GetUseCase implements UseCase 
{
    constructor(
        private repository: AccountRepository
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        const { idWallet } = input;
        const accounts: Account[] | null = await this.repository.findByIdWallet(idWallet);
        return {
            accounts: accounts ? accounts.map(acconut => ({
                id: acconut.id,
                nickname: acconut.name.toString(),
                amount: acconut.amount,
                category: acconut.category,
                currency: acconut.currency,
                created: acconut.created
            })) : []
        };
    }
}

type Input = {
    idWallet: string
}   

type Output = {
    accounts: {}
};