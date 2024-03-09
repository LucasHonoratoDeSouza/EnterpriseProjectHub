
const { BrowserWindow } = require('electron');

let mainWindow;

function createWindowMain(){
    mainWindow = new BrowserWindow({
        width: 1333,
        height: 685,
        movable: true,
        title: 'EnterpriseProjectHub',
        icon: __dirname + './../src/components/img/Ico.jpeg',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }        
    });
    mainWindow.setMenuBarVisibility(false)
    mainWindow.loadURL("http://localhost:3000/")
};

const {app, globalShortcut} = require('electron')


app.on('ready', () => {
    createWindowMain();
    const ret = globalShortcut.register('CommandOrControl+Shift+I', () => {

    })
    if (!ret) {
        console.log('Falha ao registrar o atalho');
    }
    console.log(globalShortcut.isRegistered('CommandOrControl+Shift+I'));
});
  
app.on('will-quit', () => {
    globalShortcut.unregister('CommandOrControl+Shift+I');
});

app.allowRendererProcessReuse = false

