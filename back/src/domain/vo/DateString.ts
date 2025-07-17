export class DateString
{
    private value: Date;

    constructor(date: string) 
    {
        if (!this.validate(date)) throw new Error("Data inválido");
        this.value = new Date(date);
    }

    private validate(date: string): boolean 
    {
        return !isNaN(Date.parse(date));
    }

    public now(): void 
    {
        this.value = new Date();
    }

    public toString() 
    {
        return this.value;
    }
}
