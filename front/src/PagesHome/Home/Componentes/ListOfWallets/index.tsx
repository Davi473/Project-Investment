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

const ListOfWallets = ({wallets}: any) => {
    // const [investment, setInvestment] = useState<any>();
    console.log(wallets);
    
    // useEffect(() => {
    //     const init = async () => {
    //         const token = localStorage.getItem("token");
    //         await fetch(`http://localhost:3000/investment/${idWallet}`, {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         }});
    //     };
    //     init();
    // }, [investment]);

    return (
        <div style={{paddingTop: "50px"}}>
            <ResumeWallet values={resumeWalletInvestments} input={"List Of Wallets"}/>
        </div>
    );
};

export default ListOfWallets;
