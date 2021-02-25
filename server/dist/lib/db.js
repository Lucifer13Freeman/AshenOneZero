"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const config = require('./config');
module.exports = () => {
    mongoose
        .connect(config.mongo_uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then((() => console.log('Success: MongoDB has been connected!')))
        .catch((e) => console.log(e));
};
