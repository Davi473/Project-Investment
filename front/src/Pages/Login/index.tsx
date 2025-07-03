import styles from './styles.ts';

export const LoginForm: any = ({onTrocarPagina}: any) => {
  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h1>Login</h1>

        <label style={styles.label}>Email</label>
        <input type="email" placeholder="Enter your email" style={styles.input} />

        <label style={styles.label}>Password</label>
        <input type="password" placeholder="Enter your password" style={styles.input} />

        <span style={{ marginTop: "10px", color: "white", fontSize: "0.9em" }}>
          Click here to{' '}
          <span
            style={{
              color: "white",
              textDecoration: "underline",
              cursor: "pointer"
            }}
            onClick={() => onTrocarPagina("register")}
          >
            Register
          </span>
        </span>
      </div>
    </div>
  );
};
