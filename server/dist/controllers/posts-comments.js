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
const router = new Router().prefix('/posts/:postID/comments');
router.post('/', passport.authenticate('jwt', { session: false }), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post.findById(ctx.params.postID);
    if (!post)
        ctx.throw(404, 'Error: Post has not been found!');
    const { body } = ctx.request.body;
    post.comments.unshift({ body, user: ctx.state.user._id });
    ctx.body = yield post.save();
}));
router.delete('/:commentID', passport.authenticate('jwt', { session: false }), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post.findById(ctx.params.postID);
    if (!post)
        ctx.throw(404, 'Error: Post has not been found!');
    const comment_id = post.comments.findIndex((comment) => comment._id.toString() === ctx.params.commentID);
    if (comment_id < 0)
        ctx.throw(404, 'Error: Like has not been found!');
    post.comments.splice(comment_id, 1);
    ctx.body = yield post.save();
}));
module.exports = router.routes();
