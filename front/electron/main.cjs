"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path_1 = require("path");
var mainWindow;
var createWindow = function () {
    mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path_1.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
        frame: false,
        autoHideMenuBar: true,
    });
    // mainWindow.loadURL('http://localhost:5173');
    mainWindow.loadFile(`${__dirname}/../dist/index.html`);
    mainWindow.webContents.openDevTools(); // Descomente para abrir o DevTools automaticamente
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
};
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
electron_1.ipcMain.on('message-from-renderer', function (event, arg) {
    console.log(arg);
    mainWindow === null || mainWindow === void 0 ? void 0 : mainWindow.webContents.send('message-from-main', 'Mensagem do processo principal');
});
electron_1.ipcMain.on('meu-canal', function (event, arg) {
    event.reply('resposta-canal', { resposta: 'Recebido no Electron!' });
});
electron_1.ipcMain.on('window-minimize', function () {
    if (mainWindow)
        mainWindow.minimize();
});
electron_1.ipcMain.on('window-maximize', function () {
    if (mainWindow) {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        }
        else {
            mainWindow.maximize();
        }
    }
});
electron_1.ipcMain.on('window-close', function () {
    if (mainWindow)
        mainWindow.close();
});
