import { UserRepository } from "../../application/repositories/UserRepository";
import { User } from "../../domain/entity/User";
import { Email } from "../../domain/vo/Email";

export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  async save(user: User): Promise<void> {
    this.users.set(user.email.toString(), user);
  }

  async findByEmail(email: Email): Promise<User | null> {
    return this.users.get(email.toString()) || null;
  }
}
