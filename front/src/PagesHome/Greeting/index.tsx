function day() {
    const date = new Date();
    const hour = date.getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    else if (hour >= 12 && hour < 18)  return "Good Afternoon";
    else return "Good Evening";
}

const Greeting = ({ name }: any) => {
    return (
        <div style={styles.container}>
            <small>{day()},</small>
            <small>{name}</small>
        </div>
    );
};

export default Greeting;

const styles: any = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        padding: "10px"
    }
}