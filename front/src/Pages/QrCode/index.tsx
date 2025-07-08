import React, { useEffect, useState } from 'react';
import styles from './styles.ts';

/**
 * Service responsável por buscar o QR Code e o segredo para autenticação 2FA.
 * @param token Token JWT do usuário logado
 * @returns Um objeto contendo a URL da imagem do QR Code e o segredo TOTP
 * @throws Error se a requisição falhar
 */
async function fetchQrCode(token: string | null): Promise<{ qrCode: string; secret: string }> {
  const response = await fetch('http://localhost:3000/qrcode/generate-totp-secret', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  console.log(response);
  // if (!response.ok) {
  //   throw new Error('Failed to fetch QR code');
  // }
  return response.json();
}

interface QrCodePageProps {
  onTrocarPagina: (pagina: string) => void;
}

/**
 * Página de exibição do QR Code para autenticação 2FA.
 * Busca o QR Code e o segredo ao montar e exibe para o usuário.
 * Caso não encontre o token, redireciona para o login.
 */
export const QrCodePage: React.FC<QrCodePageProps> = ({ onTrocarPagina }) => {
  // Estado para armazenar a URL do QR Code
  const [qrValue, setQrValue] = useState('');
  // Estado para armazenar o segredo TOTP
  const [secret, setSecret] = useState('');

  useEffect(() => {
    // Recupera o token salvo no localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token não encontrado. Faça login novamente.');
      onTrocarPagina('login');
      return;
    }
    // Busca o QR Code e o segredo usando o service
    fetchQrCode(token)
      .then(data => {
        setQrValue(data.qrCode);
        setSecret(data.secret);
      })
      .catch(error => {
        console.error('Error fetching QR code:', error);
        alert('Erro ao gerar o QR Code. Por favor, tente novamente.');
      });
  }, [onTrocarPagina]);

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <span>Generate QR Code for</span>
        <span>Google Authenticator</span>
        {/* Exibe o QR Code gerado */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <img src={qrValue} alt="QR Code 2FA" />
        </div>
        {/* Exibe o segredo para digitação manual */}
        <p>Ou digite este código manualmente:
          <strong>
            <span>{secret}</span>
          </strong>
        </p>
      </div>
    </div>
  );
};
