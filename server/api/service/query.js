var ServerConfig = require('./../../server.js').ServerConfig,
    Parse = require('parse').Parse;

Parse.initialize(ServerConfig.parseAppId, ServerConfig.parseJavascriptKey);

var Query = {
    
};

module.exports = Query;