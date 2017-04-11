
var markdown = require( "markdown" ).markdown;
var styleTag = document.createElement("HTML"), flask = new CodeFlask;
var codeBox = document.getElementById("testmich");

document.querySelector('#previewField').appendChild(styleTag);

flask.run('#code', {
    language: 'markdown',
    lineNumbers: true
});

flask.onUpdate(function (code) {
    styleTag.innerHTML = markdown.toHTML( code );
    console.log(codeBox.selectionStart);
});

flask.update("### Docker\nDillinger is very easy to install and deploy in a Docker container.");

