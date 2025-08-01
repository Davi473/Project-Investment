import { Currency } from "../vo/Currency";
import { Nickname } from "../vo/Nickname";
import crypto from "crypto";

export class Wallet 
{
    constructor(
        readonly id: string,
        readonly idUser: string,
        readonly name: Nickname,
        readonly currency: Currency,
        readonly createdAt: Date,
        readonly type: string,
    ) {}
}