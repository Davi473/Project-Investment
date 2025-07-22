import { useState } from "react";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <>
      <div style={styles.container} onClick={togglePopup}>
        <div style={{ ...styles.line, ...(isOpen ? styles.line1Open : styles.line1) }} />
        <div style={{ ...styles.line, ...(isOpen ? styles.line2Open : styles.line2) }} />
        <div style={{ ...styles.line, ...(isOpen ? styles.line3Open : styles.line3) }} />
      </div>

      {isOpen && (
        <div style={styles.popupOverlay} onClick={togglePopup}>
          {/* Conteúdo do popup */}
        </div>
      )}
    </>
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
    padding: "10px",
    zIndex: 1001,
  },
  line: {
    height: "4px",
    width: "20px",
    backgroundColor: "#111",
    borderRadius: "3px",
    transition: "all 0.3s ease-in-out",
    boxShadow: "0 1px 2.5px rgba(0, 0, 0, 0.3)",
    transformOrigin: "center",
    position: "absolute",
  },
  line1: {
    transform: "rotate(0deg) translateY(-8px)",
  },
  line1Open: {
    transform: "rotate(45deg)",
  },
  line2: {
    opacity: 1,
    transform: "translateY(0)",
  },
  line2Open: {
    opacity: 0,
  },
  line3: {
    transform: "rotate(0deg) translateY(8px)",
  },
  line3Open: {
    transform: "rotate(-45deg)",
  },
  popupOverlay: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "400px",
    width: "400px",
    backgroundColor: "rgba(217, 217, 217, 0.6)",
    zIndex: 1000,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
