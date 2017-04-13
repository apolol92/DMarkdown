const { ipcRenderer } = require('electron')
var DRedoModule = require('./js/DRedo')
var markdown = require("markdown").markdown;
var styleTag = document.createElement("HTML"), flask = new CodeFlask;
var codeBox = document.getElementById("testmich");
var dRedoer = new DRedoModule.DRedo();
var wasRedo = false;
var wasUndo = false;

document.querySelector('#previewField').appendChild(styleTag);

flask.run('#code', {
    language: 'markdown',
    lineNumbers: true
});

flask.onUpdate(function (code) {
    styleTag.innerHTML = markdown.toHTML(code);
    dRedoer.controlledActionAdding(code);
    if(!wasRedo && !wasUndo) {
        dRedoer.clearRedo();
    }
    wasRedo = false;
    wasUndo = false;
    //console.log(flask.textarea.selectionStart);
    //flask.textarea.setSelectionRange(0, 0);
});

flask.update("### Docker\nDillinger is very easy to install and deploy in a Docker container.");

ipcRenderer.on('info', function (event, data) {
    console.log(data.msg)
    flask.update(data.msg);
});

ipcRenderer.on("undo", function(event, data) {
    var currentState = dRedoer.undoAction();
    wasUndo = true;
    flask.update(currentState);

});

ipcRenderer.on("redo", function(event, data) {
    var currentState = dRedoer.redoAction();
    wasRedo = true;
    flask.update(currentState);

});

ipcRenderer.on("filename2Save", function (event, data) {
    const fs = require("fs");
    //fs.writeFile(data.msg, document.)

    fs.writeFile(data.msg, flask.textarea.value, (err) => {
        if (err) {
            alert("An error ocurred creating the file " + err.message)
            return;
        }
    });
})

ipcRenderer.on("filename2export", function (event, data) {
    const fs = require("fs");
    //fs.writeFile(data.msg, document.)

    fs.writeFile(data.msg, document.getElementById("previewField").innerHTML, (err) => {
        if (err) {
            alert("An error ocurred creating the file " + err.message)
            return;
        }
    });
})

