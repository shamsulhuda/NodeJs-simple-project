// Sample handleReqRes
const handler = {};
handler.sampleHandler = (requestProperty, callback) => {
    console.log('sample handler file');
    callback(200, {
        message: 'This is a sample url',
    });
};

module.exports = handler;
