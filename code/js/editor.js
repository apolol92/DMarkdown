class Editor {
    constructor(editorTextArea) {
        this.editor = CodeMirror.fromTextArea(editorTextArea, {
            lineNumbers: true,
            mode: "markdown",
            theme: "icecoder",
            scrollbarStyle: "simple"
        });
    }

    editorEvents(previewField, cursorRowSpan, cursorColSpan) {
        var editor = this.editor;
        this.editor.on("change", function () {
            var code = editor.getValue();
            previewField.innerHTML = markdown.toHTML(code);
            //cursorRowSpan.innerHTML = editor.getCursor().line;
        });

        this.editor.on("cursorActivity", function () {
            cursorRowSpan.innerHTML = editor.getCursor().line + 1;
            cursorColSpan.innerHTML = editor.getCursor().ch + 1;
        });
    }

    editorExternCommunication(previewField) {
        var editor = this.editor;
        ipcRenderer.on('info', function (event, data) {
            document.title = "DMarkdown - " + data.filename
            editor.setValue(data.msg);
        });

        ipcRenderer.on("undo", function (event, data) {
            editor.undo();
        });

        ipcRenderer.on("redo", function (event, data) {
            editor.redo();
        });

        ipcRenderer.on("filename2Save", function (event, data) {
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
            //fs.writeFile(data.msg, document.)
            var html = "<html>\n<head></head>\n<body>\n" + previewField.innerHTML + "\n</body>\n</html>";
            fs.writeFile(data.msg, html, (err) => {
                if (err) {
                    alert("An error ocurred creating the file " + err.message)
                    return;
                }
            });
        });
    }
}



