import { Wallet } from "../../../domain/entity/Wallet";
import { UUIDGenerator } from "../../../domain/ports/UUIDGenerator";
import { Currency } from "../../../domain/vo/Currency";
import { Nickname } from "../../../domain/vo/Nickname";
import WalletInvestmentRepository from "../../repositories/WalletInvestmentRepository";
import UseCase from "../UseCase";

export class CreateUseCase implements UseCase {
    constructor(
        private walletInvestmentRepository: WalletInvestmentRepository,
        private uuidGenerator: UUIDGenerator,
    ) {}

    public async execute(input: Input): Promise<Output> 
    {
        const { idUser, nickname, currency } = input;
        const wallet = new Wallet(
            this.uuidGenerator.generate(), 
            idUser, 
            new Nickname(nickname),
            new Currency(currency ? currency : "USD"),
            new Date(),
            "i"
        );
        this.walletInvestmentRepository.save(wallet);
        return {"menssage": "Wallet criada com sucesso."};
    }
}

type Input = {
    idUser: string,
    nickname: string
    currency?: string,
}   

type Output = {
    menssage: string,
};