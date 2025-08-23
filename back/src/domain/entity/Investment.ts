import { Nickname } from "../vo/Nickname";
import { DateString } from "../vo/DateString";

export class Investment 
{
  constructor(
    readonly id: string,
    readonly idWallet: string,
    readonly name: Nickname,
    readonly idCategory: string,
    readonly buy: boolean,
    readonly quantity: number,
    readonly average: number,
    readonly created: DateString,
    readonly idCurrency: string,
  ) {}

  public valueTotal(): number 
  {
    return this.quantity * this.average;
  }
}
