
import { InJSONUserRepository } from "../../src/infrastructure/repositories/InMemoryUserRepository";

test('JSON Repository Test', async () => {
    const userJson = new InJSONUserRepository();
    console.log(await userJson.readJSONFile());
});