import { investmentService } from "../services/investmentService";

export const useInvestment = () => {
    const getInvestment = async (wallet: string) => {
        const response = await investmentService.get(wallet);
        return response;
    };

    return { getInvestment };
};
