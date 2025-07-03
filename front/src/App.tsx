import { useEffect, useState } from 'react'
import { RegisterForm } from './Pages/Register';
import { WindowControls } from './Component/WindowControls';
import { LoginForm } from './Pages/Login';

function App() {
  const [paginaAtual, setPaginaAtual] = useState<string>('login');

  // useEffect(() => {
  //   // Enviar mensagem para o Electron
  //   electronApi.send('meu-canal', { mensagem: 'Olá Electron!' });
  //   // Ouvir resposta do Electron
  //   electronApi.on('resposta-canal', (event: any, data: any) => {
  //     console.log('Resposta do Electron:', data);
  //   });
  // }, []);

   const renderPagina = () => {
    switch (paginaAtual) {
      case 'register':
        return <RegisterForm onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
      case 'login':
        return <LoginForm onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
      default:
        return <LoginForm onTrocarPagina={(valor: string) => setPaginaAtual(valor)} />;
    }
  };

  return (
    <>
      <WindowControls />
      {renderPagina()}
    </>
  )
}

export default App;