const { Menu, electron, app, ipcMain, dialog, shell } = require('electron')
const inter = require("./Internationalizer");
const fs = require("fs");
var DInternationalizer = new inter.Internationalizer(app.getLocale(), "en", fs.readFileSync("assets/Internationalizer.json"));
var currentFilename = undefined;


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
          dialog.showSaveDialog({
            filters: [
              { name: 'HTML', extensions: ['html'] },
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
          dialog.showOpenDialog((filenames) => {
            if (filenames === undefined) {
              alert("No file selected!");
            }
            else {      
              currentFilename = filenames[0];
              var data = fs.readFileSync(currentFilename, "utf-8");
              focusedWindow.send("info", { msg: data, filename: currentFilename });
            }
          });
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
          if (DInternationalizer.getLanguage() === "de") {
            shell.openExternal('http://markdown.de/');
          }
          else if (DInternationalizer.getLanguage() === "en") {
            shell.openExternal('https://guides.github.com/features/mastering-markdown/');
          }
          else {
            shell.openExternal('https://guides.github.com/features/mastering-markdown/');
          }
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)