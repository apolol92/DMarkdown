/**
 * @author Dennis Groß
 * @date 14.04.2017
 * This class makes the static html-editor dynamically.
 * It adds change and cursoer events to the editor.
 * It communicates with the electron backendsystem..
 */
class Editor {
    /**
     * This constructor binds the given textarea to the editor..
     * @param {the textarea will be binded to the editor} editorTextArea 
     */
    constructor(editorTextArea) {
        this.editor = CodeMirror.fromTextArea(editorTextArea, {
            lineNumbers: true,
            mode: "markdown",
            theme: "icecoder",
            scrollbarStyle: "simple"
        });
    }
    /**
     * This method will add events to the current editor..
     * @param {The field will show the translated Markdown as HTML} previewField 
     * @param {This placeholder shows the current cursor-row} cursorRowSpan 
     * @param {This placeholder show the current cursor-col} cursorColSpan 
     */
    editorEvents(previewField, cursorRowSpan, cursorColSpan) {
        var editor = this.editor;
        this.editor.on("change", function () {
            var code = editor.getValue();
            previewField.innerHTML = markdown.toHTML(code);
        });

        this.editor.on("cursorActivity", function () {
            cursorRowSpan.innerHTML = editor.getCursor().line + 1;
            cursorColSpan.innerHTML = editor.getCursor().ch + 1;
        });
    }

/**
 * This method creates a communication between the editor and the electron-backend..
 * @param {The field will show the translated Markdown as HTML} previewField 
 */
    editorExternCommunication(previewField) {
        var editor = this.editor;
        ipcRenderer.on('info', function (event, data) {
            document.title = "DMarkdown - " + data.filename;
            editor.setValue(data.msg);
        });

        ipcRenderer.on("undo", function (event, data) {
            editor.undo();
        });

        ipcRenderer.on("redo", function (event, data) {
            editor.redo();
        });

        ipcRenderer.on("filename2Save", function (event, data) {
            document.title = "DMarkdown - " + data.msg;
            fs.writeFile(data.msg, editor.getValue(), (err) => {
                if (err) {
                    alert("An error ocurred creating the file " + err.message)
                    return;
                }
            });
        });

        ipcRenderer.on("filename2export", function (event, data) {
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



