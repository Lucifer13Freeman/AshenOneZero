"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser = require('./body-parser');
const errors = require('./errors');
const mongoose_error = require('./mongoose-errors');
const passport_init = require('./passport-init');
const koa_static = require('./static');
module.exports = {
    body_parser,
    errors,
    mongoose_error,
    passport_init,
    koa_static
};
