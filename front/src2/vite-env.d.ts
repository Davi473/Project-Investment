/// <reference types="vite/client" />

interface ElectronAPI {
  minimize: () => void;
  maximize: () => void;
  close: () => void;
  getPlatform: () => string;
}

interface Window {
  electronAPI: ElectronAPI;
}
