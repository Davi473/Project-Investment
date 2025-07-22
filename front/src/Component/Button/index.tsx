import './style.css';

function ButtonEntry({ output }: any) {
    return (
        <input
            type="button"
            value="Enter"
            className="custom-button"
            onClick={() => output()}
        />
    );
}
export default ButtonEntry;