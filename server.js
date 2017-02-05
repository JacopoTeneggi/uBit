'use strict';

const http = require('http');
const express = require('express');
const url = require('url');
const ws = require('ws');

const app = express();

app.use((req, res) => {
    res.send('HELLO');
});

const server = http.createServer(app);
const wss = new ws.Server({ server });

wss.on('connection', (ws) => {
    const location = url.parse(ws.upgradeReq.url, true);

    ws.on('message', (message) => {
        console.log(`Received ${message}`);
    });

    ws.send('something');
});

server.listen(8080, () => {
    console.log('Express listening on port 8080');
});