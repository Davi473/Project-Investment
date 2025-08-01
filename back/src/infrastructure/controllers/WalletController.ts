import { CreateUseCase } from "../../application/usecase/walletInvestiment/CreateUseCase";
import { GetUseCase } from "../../application/usecase/walletInvestiment/GetUseCase";
import { Auth, UserAuth } from "../decorators/Auth";
import { Body, Controller, Post, Get } from "../decorators/Method";

@Controller("/wallet")
export default class WalletController 
{
    constructor(
        private createWallet: CreateUseCase,
        private getWallet: GetUseCase
    ) {}
    
    @Auth()
    @Post()
    async create(@Body() wallet: any, @UserAuth() user: any, res: any): Promise<any>
    {
        const input = { ...wallet, ...user };
        const output = await this.createWallet.execute(input);
        res.status(201).json(output);
    }

    @Auth()
    @Get()
    async get(@UserAuth() user: any, res: any): Promise<any>
    {
        const input = user;
        const output = await this.getWallet.execute(input);
        res.status(201).json(output);
    }
}