"use strict";
module.exports = {
    port: process.env.PORT || 8080,
    mongo_uri: process.env.MONGO_URI,
    secret: process.env.SECRET || 'secret'
};
