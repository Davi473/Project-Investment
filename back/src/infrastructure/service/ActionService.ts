import { ActionRepository } from "../../application/repositories/ActionRepository";
import yahooFinance from "yahoo-finance2";
import { Action } from "../../domain/entity/Action";

export class ActionService {

    constructor(private repository: ActionRepository) {
        this.init();

        setInterval(() => {
            this.init();
            console.log("Atualizado");
        }, 10 * 60 * 1000);
    }

    private async init() {
        const actions = await this.repository.findAll();
        if (actions.length === 0 ) return;
        for (const action of actions) {
            const actionNew = await this.getValueAction(action.name);
            if (!actionNew.price) continue;
            const actionObject = new Action(
                crypto.randomUUID(),
                action.name,
                actionNew.price
            );
            this.repository.save(actionObject);
        }
    }

    public async get(action: string): Promise<Action>  {
        const actionExist = await this.repository.findByName(action);
        if (!actionExist) {
            const actionNew = await this.getValueAction(action);
            if (!actionNew.price) throw new Error(`Action ${action} no exist`);
            const actionObject = new Action(
                crypto.randomUUID(),
                action,
                actionNew.price
            );
            this.repository.save(actionObject);
            return actionObject;
        }
        return actionExist;
    }

    private async getValueAction(symbol: string) {
        const quote = await yahooFinance.quote(symbol);
        console.clear();
        return {
            symbol,
            price: quote.regularMarketPrice,
            currency: quote.currency,
        };
    }
}