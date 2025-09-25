
export default function Popap({ output, close }: any) {
    return (
        <div style={styles.overlay}>
          <div style={styles.popup}>
            {output}
          </div>
          <button onClick={() => close(false)}>Close</button>
        </div>
    )
}

const styles = {
  overlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  popup: {
    background: "white",
    padding: "20px 40px",
    borderRadius: "8px",
    fontSize: "18px",
    fontWeight: "bold" as const,
    boxShadow: "0px 0px 10px rgba(0,0,0,0.3)",
  },
};