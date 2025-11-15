import React, { useState, useRef, useEffect, type RefObject } from "react";

/**
 * Props para o componente Authenticator.
 * onTrocarPagina: função para navegação entre páginas (não utilizada neste componente, mas prevista para arquitetura futura).
 */
interface QrCodePageProps {
  onTrocarPagina: (pagina: string) => void;
}

/**
 * Componente de autenticação baseado em inputs segmentados para código de 8 caracteres.
 * - Permite navegação automática entre campos.
 * - Suporta colagem automática de código.
 * - Dispara requisição e alerta ao preencher todos os campos.
 *
 * Arquitetura: camada de apresentação (interface), sem lógica de domínio ou infraestrutura acoplada.
 */
export const Authenticator: React.FC<QrCodePageProps> = ({ onTrocarPagina }) => {
  // Estado para os 8 dígitos do código
  const [values, setValues] = useState<string[]>(Array(8).fill(""));
  // Refs para inputs, facilitando foco programático
  const inputRefs: RefObject<HTMLInputElement>[] = Array.from({ length: 8 }, () => useRef<HTMLInputElement>(null));

  /**
   * Atualiza o valor de um campo e foca o próximo automaticamente.
   * @param idx Índice do campo
   * @param v Valor digitado
   */
  const handleChange = (idx: number, v: string) => {
    const clean = v.replace(/[^\w\d]/, '').slice(0, 1);
    const newValues = [...values];
    newValues[idx] = clean;
    setValues(newValues);
    if (clean && inputRefs[idx + 1]) {
      inputRefs[idx + 1].current?.focus();
    }
  };

  /**
   * Ao pressionar Backspace em campo vazio, volta o foco e limpa o campo anterior.
   * @param idx Índice do campo
   * @param e Evento de teclado
   */
  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[idx] && idx > 0) {
      const newValues = [...values];
      newValues[idx - 1] = "";
      setValues(newValues);
      inputRefs[idx - 1].current?.focus();
    }
  };

  /**
   * Permite colar um código de até 8 caracteres, preenchendo todos os campos automaticamente.
   * @param e Evento de colagem
   */
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const paste = e.clipboardData.getData("text").replace(/[^\w\d]/g, "").slice(0, 8);
    if (paste.length > 0) {
      const chars = paste.split("");
      setValues(prev => prev.map((_, idx) => chars[idx] || ""));
      // Foca no último preenchido
      const lastIdx = Math.min(chars.length, 8) - 1;
      if (inputRefs[lastIdx]) inputRefs[lastIdx].current?.focus();
      e.preventDefault();
    }
  };

  /**
   * Efeito: quando todos os campos estão preenchidos, dispara requisição e alerta.
   * (Na arquitetura hexagonal, a chamada fetch seria delegada a um caso de uso ou serviço de aplicação.)
   */
  useEffect(() => {
    // @ts-ignore
    if (values.every(v => v.length === 1)) {
      alert("Todos os campos preenchidos!");
      // Exemplo de request (infraestrutura):
      try {
        fetch("http://localhost:3000/qrcode/authenticator", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ code: values.join("") })
        });
      } catch (e) {}
    }
  }, [values.join("")]);

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h1>Authenticator</h1>
        <div
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
          onPaste={handlePaste}
        >
          {/* Inputs do primeiro grupo */}
          {values.slice(0, 4).map((val, idx) => (
            <input
              key={idx}
              type="text"
              style={{ ...styles.input, textAlign: "center" }}
              maxLength={1}
              ref={inputRefs[idx]}
              value={val}
              onChange={e => handleChange(idx, e.target.value)}
              onKeyDown={e => handleKeyDown(idx, e)}
              aria-label={`Dígito ${idx + 1}`}
            />
          ))}
          <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>-</span>
          {/* Inputs do segundo grupo */}
          {values.slice(4, 8).map((val, idx) => (
            <input
              key={idx + 4}
              type="text"
              style={{ ...styles.input, textAlign: "center" }}
              maxLength={1}
              ref={inputRefs[idx + 4]}
              value={val}
              onChange={e => handleChange(idx + 4, e.target.value)}
              onKeyDown={e => handleKeyDown(idx + 4, e)}
              aria-label={`Dígito ${idx + 5}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: any = {
  container: {
    backgroundColor: "#3a3a3a",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    color: "white",
    fontFamily: "sans-serif"
  },
  input: {
    width: "10px",
    padding: "10px",
    borderRadius: "15px",
    border: "none",
    outline: "none",
    boxShadow: "2px 2px 5px #222",
    backgroundColor: "#d3d3d3",
    fontSize: "1em"
  },
};