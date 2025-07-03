import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    mainWindow.loadURL('http://localhost:5173');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// Comunicação entre processos
ipcMain.on('message-from-renderer', (event, arg) => {
    console.log(arg); // Log da mensagem recebida do processo de renderização
    mainWindow?.webContents.send('message-from-main', 'Mensagem do processo principal');
});

ipcMain.on('meu-canal', (event, arg) => {
  // Faça algo com arg
  event.reply('resposta-canal', { resposta: 'Recebido no Electron!' });
});