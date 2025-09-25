import { useEffect, useState } from 'react'
import { RegisterForm } from './PagesRegister/Register';
import { WindowControls } from './Component/WindowControls';
import { LoginForm } from './PagesRegister/Login';
import DragBar from './Component/WindowControls/DragBar';
// import { QrCodePage } from './PagesRegister/QrCode';
// import { Authenticator } from './PagesRegister/Authenticator';
import { HomeForm } from './PagesHome';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const [paginaAtual, setPaginaAtual] = useState<string>("login");

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (token) setPaginaAtual("home");
  }, []);

  const renderPagina = () => {
    switch (paginaAtual) {
      case "register":
        return <RegisterForm onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
      case "login":
        return <LoginForm onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
      // case "qrcode":
      //   return <QrCodePage onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
      // case "authenticator":
      //   return <Authenticator onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
      case "home":
        return <HomeForm onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
      default:
        return <LoginForm onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
    }
  };

  return (
    <>
      <DragBar />
      <WindowControls />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm onTrocarPagina={(valor: string) => setPaginaAtual(valor)}  />} />
          {/* <Route path="/register" element={<RegisterForm />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {renderPagina()}
    </>
  )
}

export default App;

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return null;
}