const { ipcRenderer } = require('electron')
var markdown = require("markdown").markdown;


var editor = CodeMirror.fromTextArea(document.getElementById("codeeditor"), {
    lineNumbers: true,
    mode: "markdown",
    theme: "icecoder",
    scrollbarStyle:"simple"
});
editor.on("change", function() {
    var code = editor.getValue();
    var preview = document.getElementById("previewField");
    preview.innerHTML = markdown.toHTML(code);
    document.getElementById("cursorRow").innerHTML = editor.getCursor().line;
});

editor.on("cursorActivity", function() {
    document.getElementById("cursorRow").innerHTML = editor.getCursor().line+1;
    document.getElementById("cursorCol").innerHTML = editor.getCursor().ch+1;
});

ipcRenderer.on('info', function (event, data) {
    document.title = "DMarkdown - " + data.filename
    editor.setValue(data.msg);
});

ipcRenderer.on("undo", function(event, data) {
    editor.undo();
});

ipcRenderer.on("redo", function(event, data) {
     editor.redo();
});

ipcRenderer.on("filename2Save", function (event, data) {
    const fs = require("fs");
    //fs.writeFile(data.msg, document.)
    document.title = "DMarkdown - " + data.msg;
    fs.writeFile(data.msg, editor.getValue(), (err) => {
        if (err) {
            alert("An error ocurred creating the file " + err.message)
            return;
        }
    });
});

ipcRenderer.on("filename2export", function (event, data) {
    const fs = require("fs");
    //fs.writeFile(data.msg, document.)
    var html = "<html>\n<head></head>\n<body>\n"+document.getElementById("previewField").innerHTML+"\n</body>\n</html>";
    fs.writeFile(data.msg,html, (err) => {
        if (err) {
            alert("An error ocurred creating the file " + err.message)
            return;
        }
    });
});


