import { useState } from 'react'
import { RegisterForm } from './Pages/Register';
import { WindowControls } from './Component/WindowControls';
import { LoginForm } from './Pages/Login';
import DragBar from './Component/WindowControls/DragBar';
import { QrCodePage } from './Pages/QrCode';
import { Authenticator } from './Pages/Authenticator';

function App() {
  const [paginaAtual, setPaginaAtual] = useState<string>("login");

   const renderPagina = () => {
    switch (paginaAtual) {
      case "register":
        return <RegisterForm onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
      case "login":
        return <LoginForm onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
      case "qrcode":
        return <QrCodePage onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
      case "authenticator":
        return <Authenticator onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
      default:
        return <LoginForm onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
    }
  };

  return (
    <>
      <DragBar />
      <WindowControls />
      {renderPagina()}
    </>
  )
}

export default App;