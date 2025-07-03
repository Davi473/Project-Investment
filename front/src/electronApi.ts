// Verifica se estamos rodando no contexto do Electron
// @ts-ignore
const { ipcRenderer } = window.require ? window.require('electron') : { ipcRenderer: null };

export const electronApi = {
  send: (channel: string, data?: any) => {
    if (ipcRenderer) {
      ipcRenderer.send(channel, data);
    }
  },
  on: (channel: string, callback: (event: any, ...args: any[]) => void) => {
    if (ipcRenderer) {
      ipcRenderer.on(channel, callback);
    }
  },
  removeListener: (channel: string, callback: (...args: any[]) => void) => {
    if (ipcRenderer) {
      ipcRenderer.removeListener(channel, callback);
    }
  }
};