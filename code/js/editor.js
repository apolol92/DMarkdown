const { ipcRenderer } = require('electron')
var markdown = require("markdown").markdown;
var styleTag = document.createElement("HTML"), flask = new CodeFlask;
var codeBox = document.getElementById("testmich");

document.querySelector('#previewField').appendChild(styleTag);

flask.run('#code', {
    language: 'markdown',
    lineNumbers: true
});

flask.onUpdate(function (code) {
    styleTag.innerHTML = markdown.toHTML(code);
    //console.log(flask.textarea.selectionStart);
    //flask.textarea.setSelectionRange(0, 0);
});

flask.update("### Docker\nDillinger is very easy to install and deploy in a Docker container.");

ipcRenderer.on('info', function (event, data) {
    console.log(data.msg)
    flask.update(data.msg);
});

ipcRenderer.on("filename2Save", function (event, data) {
    const fs = require("fs");
    //fs.writeFile(data.msg, document.)
    
    fs.writeFile(data.msg, flask.textarea.value, (err) => {
        if(err){
            alert("An error ocurred creating the file "+ err.message)
            return;
        }
    });
})

