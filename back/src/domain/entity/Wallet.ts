import { Currency } from "../vo/Currency";
import { Nickname } from "../vo/Nickname";

export class Wallet 
{
    constructor(
        readonly id: string,
        readonly idUser: string,
        readonly nickname: Nickname,
        readonly currency: Currency,
    ) {}
}