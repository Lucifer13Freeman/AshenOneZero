"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const post_schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    body: {
        type: String,
        required: true
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: true
            },
            created_date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: true
            },
            body: {
                type: String,
                required: true
            },
            created_date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    created_date: {
        type: Date,
        default: Date.now
    }
});
const population_fields = 'user comments.user';
post_schema.post('save', (doc) => __awaiter(void 0, void 0, void 0, function* () {
    yield doc.populate(population_fields).execPopulate();
}));
function populate_fields() {
    this.populate(population_fields);
}
post_schema.pre('find', populate_fields);
post_schema.pre('findOne', populate_fields);
post_schema.pre('findOneAndUpdate', populate_fields);
module.exports = mongoose.model('posts', post_schema);
