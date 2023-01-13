// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const db_helper = require('./MainProcessor/database/db_helper')
const { channels } = require('./frontend/src/shared/constants')
const { getSetsData, getCardsData } = require('./helpers/ReadAllJSONData')


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'frontend/src/preload.js'),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  // mainWindow.loadFile('RendererProcessor/index.html')
  // mainWindow.loadFile('frontend/build/index.html')

  let isDev=true
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, 'frontend/build/index.html')}` //TODO figure this out
  );
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  ipcMain.on(channels.GET_DATA, (event, arg) => {
    const { type, value, setId } = arg;
    console.log(arg);
    switch (type) {
      case 'FetchData':
        switch (value) {
          case 'Sets':
            let setData = {'type': 'Sets', 'value': getSetsData()}
            event.reply(channels.GET_DATA, setData)
            break;
          case 'CardsInSet':

            let cardInSetDataFull = getCardsData()
            let cardInSetFiltered = cardInSetDataFull.filter(cardObject => cardObject.set.id === setId)
            let cardInSetData = {'type': 'CardsInSet', 'value': cardInSetFiltered}
            event.reply(channels.GET_DATA, cardInSetData)
            break;
        
          default:
            event.reply(channels.GET_DATA, 'UNKNOWN Value To Fetch')
            break;
        }
        
        break;
      case 'OpenWebsite':
        const shell = require('electron').shell;
        shell.openExternal(value)
        break;
      default:
        event.reply(channels.GET_DATA, 'UNKNOWN TYPE')
        break;
    }
  });

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.