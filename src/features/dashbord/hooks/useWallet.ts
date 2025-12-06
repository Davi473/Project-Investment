import { walletService } from "../services/walletService";

export const useWallet = () => {
    const getWallets = async () => {
        const response = await walletService.get();
        return response;
    };

    return { getWallets };
};
