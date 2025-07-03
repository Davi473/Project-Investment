import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { electronApi } from './electronApi';
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {

    // Enviar mensagem para o Electron
    electronApi.send('meu-canal', { mensagem: 'Olá Electron!' });

    // Ouvir resposta do Electron
    electronApi.on('resposta-canal', (event: any, data: any) => {
      console.log('Resposta do Electron:', data);
    });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
