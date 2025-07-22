const HamburgerMenu = () => {
  return (
    <div style={styles.container}>
      <div style={styles.line}></div>
      <div style={styles.line}></div>
      <div style={styles.line}></div>
    </div>
  );
};

export default HamburgerMenu;

const styles: any = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "20px",
    width: "20px",
    padding: "10px"
  },
  line: {
    height: "4px",
    width: "100%",
    backgroundColor: "#111",
    borderRadius: "3px",
    boxShadow: "0 1px 2.5px rgba(0, 0, 0, 0.3)"
  }
}