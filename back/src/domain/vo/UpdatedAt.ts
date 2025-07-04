export function UpdatedAt(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const originalSetter = descriptor.set;
    descriptor.set = function (value: string) {
        // Arrumar logica
        if (originalSetter) originalSetter.call(this, value);
    };
}