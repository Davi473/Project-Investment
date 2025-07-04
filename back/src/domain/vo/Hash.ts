export function Hash(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalSetter = descriptor.set;
    descriptor.set = function (value: string) {
        // Fazer logica senha
        if (originalSetter) originalSetter.call(this, value);
    };
}