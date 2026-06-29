const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("veyrDesktop", {
  quitApp: () => ipcRenderer.send("veyr:quit-app")
});
