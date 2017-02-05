'use strict';

const ws = require('ws');
const noble = require('noble');

const wss = new ws.Server({
    perMessageDeflate: false,
    port: 8080
});
console.log(`Server listening on port ${8080}`);

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`Received ${message}`);
    });

    ws.send('something');
});