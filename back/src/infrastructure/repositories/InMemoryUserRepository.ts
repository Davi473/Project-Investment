import { UserRepository } from "../../application/repositories/UserRepository";
import { User } from "../../domain/entity/User";
import { Currency } from "../../domain/vo/Currency";
import { DateString } from "../../domain/vo/DateString";
import { Email } from "../../domain/vo/Email";
import { Hash } from "../../domain/vo/Hash";
import { Nickname } from "../../domain/vo/Nickname";

export class InMemoryUserRepository implements UserRepository 
{
  private users: Map<string, User> = new Map();

  async save(user: User): Promise<void> {
    this.users.set(user.email.toString(), user);
  }

  async findByEmail(email: Email): Promise<User | null> {
    return this.users.get(email.toString()) || null;
  }
}

export class InJSONUserRepository implements UserRepository 
{
  private readonly filePath = require('path').resolve(__dirname, '../../../database/user.json');

  async save(user: User): Promise<void> 
  {
    const users = await this.readJSONFile();
    users.push({
      id: user.id,
      nickname: user.nickname.toString(),
      email: user.email.toString(),
      hash: user.hash.toString(),
      createdAt: user.createdAt.toString(),
      updatedAt: user.updatedAt.toString(),
      currency: user.currency.toString(),
    });
    await this.writeJSONFile(users);
  }

  async findByEmail(email: Email): Promise<User | null> 
  {
    const users = await this.readJSONFile();
    const userData = users.find((u: any) => u.email === email.toString());
    if (!userData) return null;
    return new User(
      userData.id,
      new Nickname(userData.nickname),
      new Email(userData.email),
      new Hash(userData.hash),
      new DateString(userData.createdAt),
      new DateString(userData.updatedAt),
      new Currency(userData.currency),
    );
  }

  public async readJSONFile(): Promise<any[]> 
  {
    const fs = await import('fs/promises');
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw err;
    }
  }

  public async writeJSONFile(data: any[]): Promise<void> 
  {
    const fs = await import('fs/promises');
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}