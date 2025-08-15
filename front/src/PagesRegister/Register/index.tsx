import ButtonEntry from "../../Component/Button";
import Popap from "../../Component/Popap";
import styles from "./styles";
import { useState } from "react";

interface QrCodePageProps {
  onTrocarPagina: (pagina: string) => void;
}

export const RegisterForm: React.FC<QrCodePageProps> = ({onTrocarPagina}) => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [popupOutput, setPopupOutput] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const registerUser = async () => 
  {
    if(!email || !nickname || !password) {
      setPopupMessage("Por favor, preencha todos os campos.");
      return;
    }
    try {
      const reponse = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nickname: nickname,
          email: email,
          password: password
        })
      }); 
      console.log(reponse);
      if (reponse.status === 201) {
        onTrocarPagina("login");
      } else {
        const errorData = await reponse.json();
        setPopupMessage(errorData.message || "Erro ao registrar usuário");
        setPopupOutput(true);
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      setPopupMessage("Erro ao registrar usuário. Tente novamente mais tarde.");
      setPopupOutput(true);
    }
  }

  return (
    <div style={styles.container}>
      {popupOutput && <Popap output={popupMessage} close={setPopupOutput} />}
      <div style={styles.form}>
        <h1>Register</h1>

        <label style={styles.label}>Email</label>
        <input type="email" placeholder="Enter your email" style={styles.input} 
          onChange={(e) => setEmail(e.target.value)} value={email}
        />

        <label style={styles.label}>Nickname</label>
        <input type="text" placeholder="Choose a nickname" style={styles.input} 
          onChange={(e) => setNickname(e.target.value)} value={nickname}
        />

        <label style={styles.label}>Password</label>
        <input type="password" placeholder="Create a password" style={styles.input} 
          onChange={(e) => setPassword(e.target.value)} value={password}
        />

        <ButtonEntry
          output={() => registerUser()}
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