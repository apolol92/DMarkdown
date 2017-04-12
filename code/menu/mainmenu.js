const { Menu } = require('electron')
const electron = require('electron')
const app = electron.app;
var currentFilename = undefined;
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

function sendFilenameToRenderer(focusedWindow, filename) {
  focusedWindow.send("filename2Save", { msg: filename });
}

const template = [
  {
    label: 'Datei',
    submenu: [
      {
        label: 'speichern',
        click(item, focusedWindow) {
          const { dialog } = require("electron");
          if (currentFilename == undefined) {
            dialog.showSaveDialog((fileName) => {
              if (fileName === undefined) {
                console.log("You didn't save the file");
                return;
              }
              currentFilename = fileName;
              sendFilenameToRenderer(focusedWindow, fileName);

            });
          }
          else {
            sendFilenameToRenderer(focusedWindow, currentFilename);
          }
        }
      },
      {
        label: 'speichern als',
        click(item, focusedWindow) {
          const { dialog } = require("electron");
          dialog.showSaveDialog((fileName) => {
            if (fileName === undefined) {
              console.log("You didn't save the file");
              return;
            }
            currentFilename = fileName;
            sendFilenameToRenderer(focusedWindow, fileName);

          });
        }

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