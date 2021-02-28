export {};

const Router = require('koa-router');
const passport = require('koa-passport');

const Post = require('../models/Post');


const router = new Router().prefix('/posts/:postID/likes');

router.post('/', passport.authenticate('jwt', { session: false }), async (ctx:any) => 
{
    const post = await Post.findById(ctx.params.postID);

    if (!post) ctx.throw(404, 'Error: Post has not been found!');

    const user = ctx.state.user._id;

    if (post.likes.find((like:any) => like.user.toString() === user.toString())) 
    { ctx.throw(400, 'Error: User already liked this post!')};

    post.likes.unshift({ user });

    ctx.body = await post.save();
});

router.delete('/:likeID', passport.authenticate('jwt', { session: false }), async (ctx:any) => 
{
    const post = await Post.findById(ctx.params.postID)

    if (!post) ctx.throw(404, 'Error: Post has not been found!');

    const like_id = post.likes.findIndex((like:any) => like._id.toString() === ctx.params.likeID);
    
    if (like_id < 0) ctx.throw(404, 'Error: Like has not been found!');
    
    post.likes.splice(like_id, 1);

    ctx.body = await post.save();
});

module.exports = router.routes();