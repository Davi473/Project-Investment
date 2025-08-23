import UseCase from "../UseCase";
import { InvestmentRepository } from "../../repositories/InvestmentRepository";
import { Investment } from "../../../domain/entity/Investment";

export class GetUseCase implements UseCase 
{
    constructor(
        private investmentRepository: InvestmentRepository
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        const { idWallet } = input;
        const investments: Investment[] | null = await this.investmentRepository.findByIdWallet(idWallet);
        console.log(investments)
        return {
            investments: investments ? investments.map(investment => ({
                id: investment.id,
                idWallet: investment.idWallet,
                nickname: investment.name.toString(),
                date: investment.created.toString(),
                quantity: investment.quantity,
                average: investment.average,
                valueTotal: investment.valueTotal(),
                type: investment.buy ? "buy" : "sell"
            })) : []
        };
    }
}

type Input = {
    idWallet: string,
}   

type Output = {
    investments: {

    }
};