import { Wallet } from "../../src/domain/entity/Wallet";
import { Currency } from "../../src/domain/vo/Currency";
import { Nickname } from "../../src/domain/vo/Nickname";
import { UUIDGeneratorImpl } from "../../src/domain/vo/UUIDGeneratorImpl";

test("Wallet", () => {
    const name = new Nickname("Inter Global");
    const currency = new Currency("USD");
    const uuidGen = new UUIDGeneratorImpl();
    const wallet = new Wallet(uuidGen.generate(), uuidGen.generate(), name, currency);
    expect(wallet.currency.toString()).toBe("USD");
    expect(wallet.nickname.toString()).toBe("Inter Global");
    expect(typeof wallet.id).toBe("string");
    expect(typeof wallet.idUser).toBe("string");
})