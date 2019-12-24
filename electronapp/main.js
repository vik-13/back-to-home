console.log('Triangle adventure begins...');

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win;
 function createWindow() {
   win = new BrowserWindow({width: 1095, height: 638, icon: path.join(__dirname + '/icon.png')});
   win.loadURL(url.format({
     pathname: path.join(__dirname, 'index.html'),
     protocol: 'file',
     slashes: true
   }));

   win.on('closed', () => {
     win = null;
   })
 }

 app.on('ready', createWindow);

 app.on('activate', () => {
   if (win === nul) {
     createWindow()
   }
 })
 electron.app.on('browser-window-created',function(e,window) {
     window.setMenu(null);
 });
