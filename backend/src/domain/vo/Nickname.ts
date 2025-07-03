export function Nickname(target: any, propertyKey: string) {
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
        if (value === undefined || value === null || value === ""  || value.length <= 3) {
            throw new Error(`"${propertyKey}" cannot be empty.`);
        }
        this[propertyKey] = value;
        },
        writable: false,
        enumerable: false,
        configurable: true,
    });
}
