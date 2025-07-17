import { Email } from "../vo/Email";
import { Nickname } from "../vo/Nickname";
import { Hash } from "../vo/Hash";
import { DateString } from "../vo/DateString";
import { Currency } from "../vo/Currency";

export class User 
{
  private _isEmailVerified: boolean;
  private _totpSecret: string | null = null;

  constructor(
    readonly id: string,
    readonly nickname: Nickname,
    readonly email: Email,
    readonly hash: Hash,
    readonly createdAt: DateString,
    readonly updatedAt: DateString,
    readonly currency: Currency,
    isEmailVerified = false,
    totpSecret: string | null = null
  ) {
    this._isEmailVerified = isEmailVerified;
    this._totpSecret = totpSecret;
  }

  get isEmailVerified(): boolean 
  {
    return this._isEmailVerified;
  }

  get totpSecret(): boolean 
  {
    return this._totpSecret ? true : false;
  }

  verifyEmail() 
  {
    this._isEmailVerified = true;
    this.updatedAt.now();
  }

  enableTwoFactorAuth(secret: string) 
  {
    if (this._totpSecret) {
      throw new Error("2FA já está habilitado.");
    }
    this._totpSecret = secret;
    this.updatedAt.now();
  }

  disableTwoFactorAuth() 
  {
    this._totpSecret = null;
    this.updatedAt.now();
  }
}
