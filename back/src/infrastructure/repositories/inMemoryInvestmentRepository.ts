import { InvestmentRepository } from "../../application/repositories/InvestmentRepository";
import { Investment } from "../../domain/entity/Investment";


export class InMemoryInvestmentRepository implements InvestmentRepository {
    private investments: Investment[] = [];

    async save(investment: Investment): Promise<void>
    {
        this.investments.push(investment);
    }

    async findByIdWallet(idWallet: string): Promise<Investment[] | null>
    {
        return this.investments.filter((investment) => investment.idWallet === idWallet);
    }
}
