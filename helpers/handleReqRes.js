// handle Request and Response

const url = require('url');
const { StringDecoder } = require('string_decoder');

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

module.exports = handler;
