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
const router = new Router().prefix('/posts/:postID/likes');
router.post('/', passport.authenticate('jwt', { session: false }), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post.findById(ctx.params.postID);
    if (!post)
        ctx.throw(404, 'Error: Post has not been found!');
    const user = ctx.state.user._id;
    if (post.likes.find((like) => like.user.toString() === user.toString())) {
        ctx.throw(400, 'Error: User already liked this post!');
    }
    ;
    post.likes.unshift({ user });
    ctx.body = yield post.save();
}));
router.delete('/:likeID', passport.authenticate('jwt', { session: false }), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post.findById(ctx.params.postID);
    if (!post)
        ctx.throw(404, 'Error: Post has not been found!');
    const like_id = post.likes.findIndex((like) => like._id.toString() === ctx.params.likeID);
    if (like_id < 0)
        ctx.throw(404, 'Error: Like has not been found!');
    post.likes.splice(like_id, 1);
    ctx.body = yield post.save();
}));
module.exports = router.routes();
