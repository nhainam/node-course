const config = require("config");

module.exports = function (params) {
    if (!config.get('jwtPrivateKey')) {
        throw new Error("FATAL ERROR: jwtPrivate is not defined.");
    };
}