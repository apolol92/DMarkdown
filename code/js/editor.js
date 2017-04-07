
var styleTag = document.createElement("STYLE"),
    flask = new CodeFlask;

document.querySelector('head').appendChild(styleTag);

flask.run('#code', {
    language: 'markdown',
    lineNumbers: true
});

flask.onUpdate(function (code) {
    styleTag.innerHTML = code;
});

flask.update("### Docker\nDillinger is very easy to install and deploy in a Docker container.");

