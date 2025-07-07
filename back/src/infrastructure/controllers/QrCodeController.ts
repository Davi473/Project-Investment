import GenerateTotpSecret from "../../application/usecase/qrCode/GenerateTotpSecret";
import { Auth, UserAuth } from "../decorators/Auth";
import { Body, Controller, Post } from "../decorators/Method";

@Controller("/qrcode")
export default class QrCodeController 
{
    constructor(
        private generateTotpSecret: GenerateTotpSecret
    ) {}
    
    @Auth()
    @Post("/generate-totp-secret")
    async generateTotp(@UserAuth() user: any, res: any): Promise<any>
    {
        const input = user;
        const output = await this.generateTotpSecret.execute(input);
        res.status(201).json(output);
    }
}