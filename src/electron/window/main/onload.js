//const { ipcRenderer } = require('electron');

global.p3xre = {
    webview: undefined,
    pkg: require('../../../../package'),
    strings: require('../../../strings/en/index')
};

require('./angular')

window.p3xreRun = async function() {

    document.title =  `${p3xre.strings.title} v${p3xre.pkg.version}`
    try {
        global.p3xre.webview = document.getElementById("p3xre-redis-ui-electron");

        global.p3xre.webview.src = 'http://localhost:7843';

        global.p3xre.webview.addEventListener("dom-ready", async function() {
            if (process.env.hasOwnProperty('NODE_ENV') && process.env.NODE_ENV === 'development') {
                global.p3xre.webview.openDevTools();
            }
        });


        const { ipcRenderer } =require('electron');
        ipcRenderer.on('p3x-action', function(event, data) {
            switch(data.action) {
                case 'toast':
                    p3xre.toast.action(data.message)
                    break;
            }
        })



    } catch(e) {
        console.error(e);
        alert(e.message);
    }
    /*
    const events = [
//        'did-finish-load',
        'did-fail-load',
//        'did-frame-finish-load',
        'did-start-loading',
//        'did-stop-loading',
//        'did-get-response-details',
        'did-get-redirect-request',
        'did-get-redirect-request',
//        'dom-ready',
//        'page-favicon-updated',
        'new-window',
        'will-navigate',
        'did-navigate',
        'did-navigate-in-page',
        'will-prevent-unload',
        'crashed',
        'plugin-crashed',
        'destroyed',
        'before-input-event',
        'devtools-opened',
        'devtools-closed',
        'devtools-focused',
        'certificate-error',
        'select-client-certificate',
        'login',
        'found-in-page',
        'media-started-playing',
        'media-paused',
        'did-change-theme-color',
//        'update-target-url',
        'cursor-changed',
        'context-menu',
        'select-bluetooth-device',
        'paint',
        'devtools-reload-page',
        'will-attach-webview',
        'did-attach-webview',
//        'console-message',
    ]

    events.forEach(event => {
        webview.addEventListener(event, function() {
            console.groupCollapsed(`NGIVR-ELECTRON-EVENT: ${event}`)
            console.log(arguments);
            console.groupEnd();
        })
    })
*/

}
