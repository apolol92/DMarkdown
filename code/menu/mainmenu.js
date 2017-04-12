const { Menu } = require('electron')
const electron = require('electron')
const app = electron.app;

const { ipcMain } = require('electron')

function readFile(filepath, focusedWindow) {
  const fs = require('fs');
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) {
      alert("Error while reading file..");
      return;
    }
    else {
      focusedWindow.send("info", { msg: data });
    }
  });
}

const template = [
  {
    label: 'Datei',
    submenu: [
      {
        label: 'speichern'
      },
      {
        label: 'speichern als'
      },
      {
        label: 'exportieren'
      },
      {
        label: 'laden',
        click(item, focusedWindow) {
          //if (focusedWindow) focusedWindow.webContents.toggleDevTools()
          const { dialog } = require('electron')
          dialog.showOpenDialog((filenames) => {
            if (filenames === undefined) {
              alert("No file selected!");
            }
            else {
              readFile(filenames[0], focusedWindow);
            }
          });
          //focusedWindow.send("info",{msg:"Hello from main process"});
        }
      }
    ]
  },
  {
    label: 'Bearbeiten',
    submenu: [
      {
        label: 'Rückgängig',
        accelerator: 'Ctrl+Z',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload()
        }
      },
      {
        label: 'Wiederholen',
        accelerator: "Ctrl+Y",
        click(item, focusedWindow) {
          //if (focusedWindow) focusedWindow.webContents.toggleDevTools()
          focusedWindow.send("info", { msg: "Hello from main process" });
        }
      }
    ]
  },
  {
    label: 'Hilfe',
    submenu: [
      {
        label: 'Markdown Dokumentation',
        click() { require('electron').shell.openExternal('http://markdown.de/') }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)