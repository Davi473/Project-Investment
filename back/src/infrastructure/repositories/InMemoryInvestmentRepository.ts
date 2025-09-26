import { InvestmentRepository } from "../../application/repositories/InvestmentRepository";
import { Investment } from "../../domain/entity/Investment";
import { DateString } from "../../domain/vo/DateString";
import { Nickname } from "../../domain/vo/Nickname";


export class InMemoryInvestmentRepository implements InvestmentRepository {
    private investments: Investment[] = [];

    async save(investment: Investment): Promise<void>
    {
        this.investments.push(investment);
    }

    async findByIdWallet(idWallet: string): Promise<Investment[] | null>
    {
        return this.investments.filter((investment) => investment.idWallet === idWallet);
    }
}

import fs from 'fs/promises';
export class InJSONInvestmentRepository implements InvestmentRepository 
{
  private readonly filePath = require('path').resolve(__dirname, '../../../database/investment.json');

  async save(investment: Investment): Promise<void> 
  {
    const investments = await this.readJSONFile();
    investments.push({
      id: investment.id,
      idWallet: investment.idWallet,
      name: investment.name.toString(),
      idCategory: investment.category,
      buy: investment.buy,
      quantity: investment.quantity,
      average: investment.average,
      created: investment.created.toString(),
      idCurrency: investment.currency,
    });
    await this.writeJSONFile(investments);
  }

  async findByIdWallet(idWallet: string): Promise<Investment[] | null> 
  {
    const investments = await this.readJSONFile();
    const investmentData = investments.find((u: any) => u.idWallet === idWallet);
    if (!investmentData) return null;
    return investmentData.map((investment: any) => new Investment(
      investment.id,
      investment.idWallet,
      new Nickname(investment.name),
      investment.category,
      investment.buy,
      investment.quantity,
      investment.average,
      new DateString(investment.created),
      investment.currency
    ));
  }

  public async readJSONFile(): Promise<any[]> 
  {
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
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }
}