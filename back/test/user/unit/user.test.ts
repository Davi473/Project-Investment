import { PasswordHasherImpl } from "../../../src/domain/vo/PasswordHasherImpl";
import { UUIDGeneratorImpl } from "../../../src/domain/vo/UUIDGeneratorImpl";
import { User } from "../../../src/domain/entity/User";
import { Nickname } from "../../../src/domain/vo/Nickname";
import { Email } from "../../../src/domain/vo/Email";

const passwordAndUuidGen = () => {
    const uuidGen = new UUIDGeneratorImpl();
    const passwordHasher = new PasswordHasherImpl();
    return  {uuidGen, passwordHasher};
};

test("Criar usuario", () => {
    const { uuidGen, passwordHasher } = passwordAndUuidGen();
    const nickname = new Nickname("Joe Down");
    const email = new Email(`${Math.random()}@gmail.com`)
    const user = new User(
        uuidGen.generate(), nickname,
        email, passwordHasher.hash("12345678"),
        new Date(), new Date()
    );
});