import { CreatedAt } from "../vo/CreatedAt";
import { Email } from "../vo/Email";
import { HasAuthenticator } from "../vo/HasAuthenticator";
import { Hash } from "../vo/Hash";
import { IsEmailVerified } from "../vo/IsEmailVerified";
import { Nickname } from "../vo/Nickname";
import { UpdatedAt } from "../vo/UpdatedAt";
import crypto from "crypto";

export default class User {
    private _email: string;
    private _nickname: string;
    private _hash: string;
    private _isEmailVerified: boolean;
    private _hasAuthenticator: boolean;
    private _createdAt: Date;
    private _updatedAt: Date

    constructor(
        readonly id: string,
        nickname: string,
        email: string,
        hash: string,
        createdAt: Date,
        updatedAt: Date,
        isEmailVerified: boolean = false,
        hasAuthenticator: boolean = false
    ) {
        this.nickname = nickname;
        this.email = email;
        this._hash = hash;
        this.isEmailVerified = isEmailVerified;
        this.hasAuthenticator = hasAuthenticator;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static create(
        nickname: string, 
        email: string,
        password: string,
    ) {
        const id = crypto.randomUUID();
        const user = new User();
    }

    get email(): string {
        return this._email;
    }
    @Email
    set email(value: string) {
        this._email = value;
    }

    get nickname(): string {
        return this._nickname;
    }   
    @Nickname
    set nickname(value: string) {
        this._nickname = value;
    }

    get hash(): string {
        return this._hash;
    }
    @Hash
    set hash(value: string) {
        this._hash = value;
    }

    get isEmailVerified(): boolean {
        return this._isEmailVerified
    }
    @IsEmailVerified
    set isEmailVerified(value: boolean) {
        this._isEmailVerified = value;
    }

    get hasAuthenticator(): boolean {
        return this._hasAuthenticator;
    }
    @HasAuthenticator
    set hasAuthenticator(value: boolean) {
        this._isEmailVerified = value;
    } 

    get createdAt(): Date {
        return this._createdAt;
    }
    @CreatedAt
    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }
    @UpdatedAt
    set updatedAt(value: Date) {
        this._updatedAt = value;
    }
}