export function Controller(prefix: string = "") {
    return (target: any) => {
        if (!target.prefix) {
            target.prefix = prefix
        }
    }
}