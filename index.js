/**

Title: Uptime Monitoring Application
Description: A RESTFull API to monitor up or down time of user defined links
Author: Shamsul Huda
Date: 25/04/2022

*/

// Dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

// app object - module scaffolding

const app = {};

// configuration
app.config = {
    port: 3000,
};

// Create server

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`Listening to port: ${app.config.port}`);
    });
};

// handle request response
app.handleReqRes = (req, res) => {
    // request url
    // parse the url
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimedPth = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;

    const decoder = new StringDecoder('utf-8');
    let realData = '';
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        // response handle
        res.end('Hello Programmers');
    });
};

// Start server

app.createServer();
