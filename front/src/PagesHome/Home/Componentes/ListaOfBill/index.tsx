import ResumeWallet from "../../../../Component/ResumeWallet";

const resumaWalletBill = {
    title: "Inter",
    column1: "Value Entry",
    column2: "Value Output",
    column3: "Current Value",
    columnValue1: "R$ 1000",
    columnValue2: "R$ 900",
    columnValue3: "R$ 100"
}
const resumaWalletBills = [resumaWalletBill, resumaWalletBill, resumaWalletBill]

const ListOfBill = () => {
    return (
        <div style={{paddingTop: "50px"}}>
            <ResumeWallet values={resumaWalletBills} input={"List Of Bill"}/>
        </div>
    );
};

export default ListOfBill;
