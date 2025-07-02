import { Email } from "../vo/Email";
import { Nickname } from "../vo/Nickname";

export default class User {
    @Email
    private email: string;
    @Nickname
    private nickname: string;

    constructor (
        readonly id: string,
        nickname: string,
        email: string,
    ) {
        this.nickname = nickname;
        this.email = email;
    }
}