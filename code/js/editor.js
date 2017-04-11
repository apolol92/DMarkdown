
var markdown = require( "markdown" ).markdown;
var styleTag = document.createElement("HTML"), flask = new CodeFlask;

document.querySelector('#previewField').appendChild(styleTag);

flask.run('#code', {
    language: 'markdown',
    lineNumbers: true
});

flask.onUpdate(function (code) {
    styleTag.innerHTML = markdown.toHTML( code );
});

flask.update("### Docker\nDillinger is very easy to install and deploy in a Docker container.");

