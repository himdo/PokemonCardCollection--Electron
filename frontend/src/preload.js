const {
  contextBridge,
  ipcRenderer
} = require("electron");
const { channels } = require("./shared/constants");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  "api", {
      send: (channel, data) => {
          // whitelist channels
          // let validChannels = ["toMain"];
          // if (validChannels.includes(channel)) {
              ipcRenderer.send(channel, data);
              // ipcRenderer.invoke(channel, data);

          // }
      },
      receive: (channel, func) => {
          // let validChannels = ["fromMain"];
          // if (validChannels.includes(channel)) {
              // Deliberately strip event as it includes `sender` 
              ipcRenderer.on(channel, (event, ...args) => {console.log(...args); func(...args)});
          // }
      },
      on: ipcRenderer.on,
      ipcRenderer: ipcRenderer
      
  },
);
