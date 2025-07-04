export function Nickname(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalSetter = descriptor.set;
    descriptor.set = function (value: string) {
        if (!value || value.length <= 3) {
            throw new Error("Nickname deve ter mais de 3 caracteres.");
        }
        if (originalSetter) originalSetter.call(this, value);
    };
}