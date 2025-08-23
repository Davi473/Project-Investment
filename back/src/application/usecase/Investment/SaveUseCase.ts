import { UUIDGenerator } from "../../../domain/ports/UUIDGenerator";
import { Nickname } from "../../../domain/vo/Nickname";
import UseCase from "../UseCase";
import { DateString } from "../../../domain/vo/DateString";
import { InvestmentRepository } from "../../repositories/InvestmentRepository";
import { Investment } from "../../../domain/entity/Investment";

export class SaveUseCase implements UseCase 
{
    constructor(
        private uuidGenerator: UUIDGenerator,
        private investmentRepository: InvestmentRepository
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        const { idWallet, name, idCategory, buy, quantity, average, created, idCurrency } = input;
        const id = this.uuidGenerator.generate();
        const nameInvestment = new Nickname(name);
        const dateInvestment = new DateString(new Date(created).toISOString());
        const investment = new Investment(id, idWallet, nameInvestment, idCategory, buy, quantity, average, dateInvestment, idCurrency);
        await this.investmentRepository.save(investment);
        return {"menssage": "Save with success"};
    }
}

type Input = {
    idWallet: string,
    name: string,
    idCategory: string,
    buy: boolean,
    quantity: number,
    average: number,
    created: string,
    idCurrency: string,
}   

type Output = {
    menssage: string
};