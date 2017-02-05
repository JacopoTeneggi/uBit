'use strict';

const ws = require('ws');
const noble = require('noble');

let isNobleRady = false;

noble.on('stateChange', state => {
    isNobleRady = !isNobleRady;
    console.log(`Noble toggled state to ${isNobleRady}`);
});

const wss = new ws.Server({
    perMessageDeflate: false,
    port: 8080
});
console.log(`Server listening on port ${8080}`);

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`Received ${message}`);
    });

    if (isNobleRady) {
        noble.startScanning();
        ws.send('NOBLE STARTED SCANNING...');
    } else {
        ws.send('NOBLE IS NOT READY');
    }
});