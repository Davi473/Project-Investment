import { SaveUseCase } from "../../application/usecase/Investment/SaveUseCase";
import { GetUseCase } from "../../application/usecase/Investment/GetUseCase";
import { Auth } from "../decorators/Auth";
import { Body, Controller, Get, Params, Post } from "../decorators/Method";

@Controller("/investment")
export default class InvestmentController 
{
    constructor(
        private saveUseCase: SaveUseCase,
        private getUseCase: GetUseCase
    ) {}
    
    // @Auth()
    @Post("/:idWallet/save")
    async save(
        @Body() investment: any, 
        @Params() idWallet: string, 
        res: any
    ): Promise<any>
    {   
        console.log("InvestmentController - save");
        console.log("Investment:", investment);
        console.log("Wallet ID:", idWallet);
        // const input = user;
        // const output = await this.generateTotpSecret.execute(input);
        // res.status(201).json(output);
    }


    @Get("/:idWallet/get")
    async get(@Params() idWallet: string, res: any): Promise<any>
    {
        const input = { idWallet };
        const output = await this.getUseCase.execute(input);
        res.status(201).json(output);
    }
}