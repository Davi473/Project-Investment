import styles from "./styles";

export const RegisterForm: any = ({onTrocarPagina}: any) => {
  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h1>Register</h1>

        <label style={styles.label}>Email</label>
        <input type="email" placeholder="Enter your email" style={styles.input} />

        <label style={styles.label}>Nickname</label>
        <input type="text" placeholder="Choose a nickname" style={styles.input} />

        <label style={styles.label}>Password</label>
        <input type="password" placeholder="Create a password" style={styles.input} />

        <span style={{ marginTop: "10px", color: "white", fontSize: "0.9em" }}>
          Click here to{' '}
          <span
            style={{
              color: "white",
              textDecoration: "underline",
              cursor: "pointer"
            }}
            onClick={() => onTrocarPagina("login")}
          >
            Log In
          </span>
        </span>
      </div>
    </div>
  );
};

