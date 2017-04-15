const { Menu, electron, app, ipcMain } = require('electron')
const inter = require("./Internationalizer");
const fs = require("fs");
var DInternationalizer = new inter.Internationalizer("de", fs.readFileSync("assets/Internationalizer.json"));
var currentFilename = undefined;




function readFile(filepath, focusedWindow) {
  const fs = require('fs');
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) {
      alert("Error while reading file..");
      return;
    }
    else {
      focusedWindow.send("info", { msg: data, filename: filepath });
    }
  });
}

function sendFilenameToRenderer(focusedWindow, filename) {
  focusedWindow.send("filename2Save", { msg: filename });
}

function sendFilenameToRendererForExporting(focusedWindow, filename) {
  focusedWindow.send("filename2export", { msg: filename });
}

const template = [
  {
    label: DInternationalizer.print("file_label"),
    submenu: [
      {
        label: DInternationalizer.print("save_label"),
        accelerator: 'Ctrl+S',
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
        label: DInternationalizer.print("save_as_label"),
        accelerator: 'Ctrl+Shift+S',
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
        label: DInternationalizer.print("export_label"),
        accelerator: 'Ctrl+E',
        click(item, focusedWindow) {
          const { dialog } = require("electron");
          dialog.showSaveDialog({
            filters: [
              { name: 'HTML', extensions: ['html'] },
              //{ name: 'PDF', extensions: ['pdf'] }
            ]
          }, (fileName) => {
            if (fileName === undefined) {
              console.log("You didn't save the file");
              return;
            }
            currentFilename = fileName;
            sendFilenameToRendererForExporting(focusedWindow, fileName);
          });
        },
      },
      {
        label: DInternationalizer.print("load_label"),
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
    label: DInternationalizer.print("edit_label"),
    submenu: [
      {
        label: DInternationalizer.print("undo_label"),
        accelerator: 'Ctrl+Z',
        click(item, focusedWindow) {
          console.log("undo");
          focusedWindow.send("undo", { msg: "data" });
        }
      },
      {
        label: DInternationalizer.print("redo_label"),
        accelerator: 'Ctrl+Y',
        click(item, focusedWindow) {
          //if (focusedWindow) focusedWindow.webContents.toggleDevTools()
          console.log("redo");
          focusedWindow.send("redo", { msg: "data" });
        }
      }
    ]
  },
  {
    label: DInternationalizer.print("help_label"),
    submenu: [
      {
        label: DInternationalizer.print("doc_label"),
        click() {
          if(DInternationalizer.getLanguage()==="de") {
            require('electron').shell.openExternal('http://markdown.de/');
          }
          else if(DInternationalizer.getLanguage()==="en") {
            require('electron').shell.openExternal('https://guides.github.com/features/mastering-markdown/');
          }
          else {
            require('electron').shell.openExternal('https://guides.github.com/features/mastering-markdown/');
          }
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)