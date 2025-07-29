import ResumeWallet from "../../../../Component/ResumeWallet";

const resumeWalletInvestment = {
    title: "Inter",
    column1: "Input Value",
    column2: "Profitability",
    column3: "Current Value",
    columnValue1: "R$ 1000",
    columnValue2: "10%",
    columnValue3: "R$ 1100"
}
const resumeWalletInvestments = [resumeWalletInvestment, resumeWalletInvestment, resumeWalletInvestment, resumeWalletInvestment];

const ListOfWallets = () => {
    return (
        <div style={{paddingTop: "50px"}}>
            <ResumeWallet values={resumeWalletInvestments} input={"List Of Wallets"}/>
        </div>
    );
};

export default ListOfWallets;
