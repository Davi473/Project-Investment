import React, { useState } from 'react';
import styles from './styles.ts';
import ButtonEntry from '../../Component/Button/index.tsx';

interface QrCodePageProps {
  onTrocarPagina: (pagina: string) => void;
}

export const LoginForm: React.FC<QrCodePageProps> = ({onTrocarPagina}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    if(!email || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    const reponse = await fetch("http://localhost:3000/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }); 
    if (reponse.status === 201) {
      const data = await reponse.json();
      localStorage.setItem("token", data.token);
      onTrocarPagina("qrcode");
    } else {
      const errorData = await reponse.json();
      alert(errorData.message || "Erro ao fazer login");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h1>Login</h1>

        <label style={styles.label}>Email</label>
        <input type="email" placeholder="Enter your email" style={styles.input} 
          onChange={(e) => setEmail(e.target.value)} value={email}
        />

        <label style={styles.label}>Password</label>
        <input type="password" placeholder="Enter your password" style={styles.input} 
          onChange={(e) => setPassword(e.target.value)} value={password}
        />

        <ButtonEntry
          output={() => loginUser()}
        />
        
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
