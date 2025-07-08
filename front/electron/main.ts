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
        frame: false,
        autoHideMenuBar: true,
    });

    // mainWindow.loadURL('http://localhost:5173');
    mainWindow.loadFile('index.html');

    // mainWindow.webContents.openDevTools(); // Descomente para abrir o DevTools automaticamente

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

ipcMain.on('message-from-renderer', (event, arg) => {
    console.log(arg);
    mainWindow?.webContents.send('message-from-main', 'Mensagem do processo principal');
});

ipcMain.on('meu-canal', (event, arg) => {
    event.reply('resposta-canal', { resposta: 'Recebido no Electron!' });
});

ipcMain.on('window-minimize', () => {
    if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window-maximize', () => {
    if (mainWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    }
});

ipcMain.on('window-close', () => {
    if (mainWindow) mainWindow.close();
});