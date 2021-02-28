export {};

const Router = require('koa-router');
const passport = require('koa-passport');

const Post = require('../models/Post');


const router = new Router().prefix('/posts/:postID/comments');

router.post('/', passport.authenticate('jwt', { session: false }), async (ctx:any) => 
{
    const post = await Post.findById(ctx.params.postID)

    if (!post) ctx.throw(404, 'Error: Post has not been found!');

    const { body } = ctx.request.body;

    post.comments.unshift({ body, user: ctx.state.user._id });
    ctx.body = await post.save();
});

router.delete('/:commentID', passport.authenticate('jwt', { session: false }), async (ctx:any) => 
{
    const post = await Post.findById(ctx.params.postID)

    if (!post) ctx.throw(404, 'Error: Post has not been found!');

    const comment_id = post.comments.findIndex((comment:any) => comment._id.toString() === ctx.params.commentID);
    
    if (comment_id < 0) ctx.throw(404, 'Error: Like has not been found!');
    
    post.comments.splice(comment_id, 1);

    ctx.body = await post.save();
});

module.exports = router.routes();