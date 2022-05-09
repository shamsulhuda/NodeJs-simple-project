// handle Request and Response

const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/routeHandkers/notFoundHandler');

// module scaffolding
const handler = {};
handler.handleReqRes = (req, res) => {
    // request url
    // parse the url
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimedPth = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headersObject = req.headers;

    const requestProperty = {
        parsedUrl,
        path,
        trimedPth,
        method,
        queryStringObject,
        headersObject,
    };

    const decoder = new StringDecoder('utf-8');
    let realData = '';
    const chosenHandler = routes[trimedPth] ? routes[trimedPth] : notFoundHandler;

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
        chosenHandler(requestProperty, (statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 500;
            payload = typeof payload === 'object' ? payload : {};

            const payloadString = JSON.stringify(payload);
            // final reponse
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        // response handle
        res.end('Hello Programmers');
    });
};

module.exports = handler;
