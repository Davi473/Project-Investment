import styles from "./styles";
import { useState } from "react";

export const RegisterForm: any = ({onTrocarPagina}: any) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h1>Register</h1>

        <label style={styles.label}>Email</label>
        <input type="email" placeholder="Enter your email" style={styles.input} 
          onChange={(e) => setEmail(e.target.value)}
        />

        <label style={styles.label}>Nickname</label>
        <input type="text" placeholder="Choose a nickname" style={styles.input} 
          onChange={(e) => setNickname(e.target.value)}
        />

        <label style={styles.label}>Password</label>
        <input type="password" placeholder="Create a password" style={styles.input} 
          onChange={(e) => setPassword(e.target.value)}
        />

        <label style={styles.label}>Password</label>
        <input type="button" value="Enter" style={styles.input}
          onClick={async() => {
            const reponse = await fetch("http://localhost:3000/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                nicknameStr: nickname,
                emailStr: email,
                password: password
              })
            }); 
            if (reponse.status === 201) {
              const data = await reponse.json();
              alert(data.menssage);
              onTrocarPagina("login");
            } else {
              const errorData = await reponse.json();
              alert(errorData.message || "Erro ao registrar usuário");
            }
          }}
        />

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

