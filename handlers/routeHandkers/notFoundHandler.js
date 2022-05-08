// Not Found handleReqRes
const handler = {};
handler.notFoundHandler = (requestProperty, callback) => {
    console.log('URL Not found');
    callback(404, {
        message: 'Your requested url not found!',
    });
};

module.exports = handler;
