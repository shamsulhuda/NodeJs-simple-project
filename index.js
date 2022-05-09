/**

Title: Uptime Monitoring Application
Description: A RESTFull API to monitor up or down time of user defined links
Author: Shamsul Huda
Date: 25/04/2022

*/

// Dependencies
const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environments');
// app object - module scaffolding

const app = {};
// Create server

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log(`Listening to port: ${environment.port}`);
    });
};

// handle request response
app.handleReqRes = handleReqRes;
// Start server
app.createServer();
