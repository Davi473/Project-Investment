
export const storage = {
    set<T>(key: string, value: T): void {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(key, serialized);
        } catch (error) {
            console.error("Erro ao salvar no localStorage:", error);
        }
    },

    get<T>(key: string): T | null {
        try {
            const item = localStorage.getItem(key);
            return item ? (JSON.parse(item) as T) : null;
        } catch (error) {
            console.error("Erro ao ler do localStorage:", error);
            return null;
        }
    },

    remove(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("Erro ao remover do localStorage:", error);
        }
    },

    clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error("Erro ao limpar localStorage:", error);
        }
    },
};
