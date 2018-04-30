const commonScripts = [
    'https://cdnjs.cloudflare.com/ajax/libs/pubsub-js/1.6.0/pubsub.min.js',
    'https://unpkg.com/react@16/umd/react.production.min.js',
    'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js'
];

module.exports = function(req) {
    return commonScripts;
};