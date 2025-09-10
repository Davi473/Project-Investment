import WalletInvestmentRepository from "../../application/repositories/WalletInvestmentRepository";
import { Wallet } from "../../domain/entity/Wallet";
import { Currency } from "../../domain/vo/Currency";
import { DateString } from "../../domain/vo/DateString";
import { Nickname } from "../../domain/vo/Nickname";

// =============================================
// In-Memory WalletInvestment Repository
// =============================================
export class InMemoryWalletInvestmentRepository implements WalletInvestmentRepository {
    private wallets: Wallet[] = [];

    async save(wallet: Wallet): Promise<void> 
    {
        this.wallets.push(wallet);
    }

    async findByIdUser(idUser: string): Promise<Wallet[] | null> 
    {
        return this.wallets.filter((wallet) => wallet.idUser == idUser);
    }
}

// =============================================
// In-JSON WalletInvestment Repository
// =============================================
import fs from 'fs/promises';
import path from 'path';
export class InJSONWalletInvestmentRepository implements WalletInvestmentRepository {
  private readonly filePath = path.resolve(__dirname, '../../../database/wallet.json');

  // 🔒 fila de escrita para evitar concorrência
  private writing: Promise<void> = Promise.resolve();

  private async queueWrite(operation: () => Promise<void>): Promise<void> {
    this.writing = this.writing.then(operation).catch(() => {});
    return this.writing;
  }

  async save(wallet: Wallet): Promise<void> {
    const wallets = await this.readJSONFile();

    wallets.push({
      id: wallet.id,
      idUser: wallet.idUser,
      name: wallet.name.toString(),
      currency: wallet.currency.toString(),
      createdAt: wallet.createdAt.toString(),
      type: wallet.type,
    });

    await this.writeJSONFile(wallets);
  }

  async findByIdUser(idUser: string): Promise<Wallet[] | null> {
    const wallets = await this.readJSONFile();

    const walletsData = wallets.filter((u: any) => u.idUser === idUser);

    if (walletsData.length === 0) return null;

    return walletsData.map((wallet: any) =>
      new Wallet(
        wallet.id,
        wallet.idUser,
        new Nickname(wallet.name),
        new Currency(wallet.currency),
        new DateString(wallet.createdAt),
        wallet.type
      )
    );
  }

  public async readJSONFile(): Promise<any[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');

      if (!data || !data.trim()) {
        // arquivo existe mas está vazio
        return [];
      }

      try {
        return JSON.parse(data);
      } catch {
        console.error(`⚠️ Arquivo ${this.filePath} contém JSON inválido. Retornando lista vazia.`);
        return [];
      }
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        // se o arquivo não existir ainda, retorna lista vazia
        return [];
      }
      throw new Error("Erro ao ler o arquivo JSON de wallets");
    }
  }

  public async writeJSONFile(data: any[]): Promise<void> {
    return this.queueWrite(async () => {
      await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
    });
  }
}