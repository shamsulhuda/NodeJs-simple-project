/*
Application rourtes
*/

const { sampleHandler } = require('./handlers/routeHandkers/sampleHandler');

const routes = {
    sample: sampleHandler,
};

module.exports = routes;
