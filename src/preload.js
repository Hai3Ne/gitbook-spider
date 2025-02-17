const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  convertToPDF: (data) => ipcRenderer.invoke('convert-to-pdf', data),
  selectDirectory: () => ipcRenderer.invoke('select-output-dir')
});