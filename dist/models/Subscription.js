"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const subscription_schema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('subscriptions', subscription_schema);
