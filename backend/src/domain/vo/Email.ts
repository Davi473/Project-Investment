export function Email(target: any, propertyKey: string) {
    const capitalized = propertyKey.charAt(0).toUpperCase() + propertyKey.slice(1);

    // Define os métodos diretamente no prototype da classe
    Object.defineProperty(target, `get${capitalized}`, {
        value: function () {
        return this[propertyKey];
        },
        writable: false,
        enumerable: false,
        configurable: true,
    });

    Object.defineProperty(target, `set${capitalized}`, {
        value: function (value: any) {
        const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9_.+-]\.com$/;
        if (!pattern.test(value)) throw new Error("Não é email válido"); 
        this[propertyKey] = value;
        },
        writable: false,
        enumerable: false,
        configurable: true,
    });
}
