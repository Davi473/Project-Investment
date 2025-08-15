import { Email } from "../vo/Email";
import { Nickname } from "../vo/Nickname";
import { Hash } from "../vo/Hash";
import { DateString } from "../vo/DateString";
import { Currency } from "../vo/Currency";

export class User 
{
  private _isEmailVerified: boolean;

  constructor(
    readonly id: string,
    readonly nickname: Nickname,
    readonly email: Email,
    readonly hash: Hash,
    readonly createdAt: DateString,
    readonly updatedAt: DateString,
    readonly currency: Currency,
    isEmailVerified = false,
  ) {
    this._isEmailVerified = isEmailVerified;
  }

  get isEmailVerified(): boolean 
  {
    return this._isEmailVerified;
  }

  verifyEmail() 
  {
    this._isEmailVerified = true;
    this.updatedAt.now();
  }
}
