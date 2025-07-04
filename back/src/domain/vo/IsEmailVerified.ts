export function IsEmailVerified(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalSetter = descriptor.set;
    descriptor.set = function (value: string) {
        // Fazer logica is email verified
        if (originalSetter) originalSetter.call(this, value);
    };
}