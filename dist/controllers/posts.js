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
const Router = require('koa-router');
const passport = require('koa-passport');
const Post = require('../models/Post');
const router = new Router().prefix('/posts');
router.post('/', passport.authenticate('jwt', { session: false }), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = ctx.request.body;
    const { user } = ctx.state;
    ctx.body = yield new Post({ body, user: user._id }).save();
    ctx.status = 201;
}));
router.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = ctx;
    const { skip, limit } = query;
    delete query.skip;
    delete query.limit;
    const db_query = 'users' in query ?
        { user: { $in: query.users.split(',') } } : query;
    ctx.set('x-total-count', yield Post.count(db_query));
    ctx.body = yield Post
        .find(db_query)
        .sort({ created_date: -1 })
        .skip(+skip)
        .limit(+limit);
}));
router.get('/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = ctx.params;
    const post = yield Post.findById(id);
    if (post)
        ctx.body = post;
    else
        ctx.throw(404, 'Error: Post has not been found!');
}));
router.put('/', passport.authenticate('jwt', { session: false }), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, body } = ctx.request.body;
    const user = ctx.state.user._id;
    ctx.body = yield Post.findOneAndUpdate({ _id, user }, { $set: { body } }, { new: true });
}));
router.delete('/:_id', passport.authenticate('jwt', { session: false }), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = ctx.params;
    const user = ctx.state.user._id;
    yield Post.findOneAndRemove({ _id, user });
    ctx.body = { message: 'Success: Post has been deleted!' };
}));
module.exports = router.routes();
