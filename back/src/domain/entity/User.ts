import { Email } from "../vo/Email";
import { Nickname } from "../vo/Nickname";
import { Hash } from "../vo/Hash";

export class User {
  readonly id: string;
  private _email: Email;
  private _nickname: Nickname;
  private _hash: Hash;
  private _isEmailVerified: boolean;
  private _totpSecret: string | null = null;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    nickname: Nickname,
    email: Email,
    hash: Hash,
    createdAt: Date,
    updatedAt: Date,
    isEmailVerified = false,
    totpSecret: string | null = null
  ) {
    this.id = id;
    this._nickname = nickname;
    this._email = email;
    this._hash = hash;
    this._isEmailVerified = isEmailVerified;
    this._totpSecret = totpSecret;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get email(): Email {
    return this._email;
  }

  get nickname(): Nickname {
    return this._nickname;
  }

  get hash(): Hash {
    return this._hash;
  }

  get isEmailVerified(): boolean {
    return this._isEmailVerified;
  }

  get totpSecret(): boolean {
    return this._totpSecret ? true : false;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  verifyEmail() {
    this._isEmailVerified = true;
    this._updatedAt = new Date();
  }

  enableTwoFactorAuth(secret: string) {
    if (this._totpSecret) {
      throw new Error("2FA já está habilitado.");
    }
    this._totpSecret = secret;
    this._updatedAt = new Date();
  }

  disableTwoFactorAuth() {
    this._totpSecret = null;
    this._updatedAt = new Date();
  }
}
