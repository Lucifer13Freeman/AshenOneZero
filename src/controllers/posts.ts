export {};

const Router = require('koa-router');
const passport = require('koa-passport');

const Post = require('../models/Post');

const router = new Router().prefix('/posts');

router.post('/', passport.authenticate('jwt', { session: false }), async (ctx:any) => 
{
    const { body } = ctx.request.body;
    const { user } = ctx.state;
    ctx.body = await new Post({ body, user: user._id }).save();
    ctx.status = 201;
});

router.get('/', async (ctx:any) => 
{
    const { query } = ctx;
    const { skip, limit } = query;
    delete query.skip;
    delete query.limit;

    const db_query = 'users' in query ?
                    { user: { $in: query.users.split(',') } } : query;

    ctx.set('x-total-count', await Post.count(db_query));

    ctx.body = await Post
                    .find(db_query)
                    .sort({ created_date: -1 })
                    .skip(+skip)
                    .limit(+limit);
});

router.get('/:id', async (ctx:any) => 
{
    const { id } = ctx.params;
    const post = await Post.findById(id);

    if (post) ctx.body = post;
    else ctx.throw(404, 'Error: Post has not been found!');
});

router.put('/', passport.authenticate('jwt', { session: false }), async (ctx:any) => 
{
    const { _id, body } = ctx.request.body;
    const user = ctx.state.user._id;

    ctx.body = await Post.findOneAndUpdate(
        { _id, user },
        { $set: { body } },
        { new: true }
    );
});

router.delete('/:_id', passport.authenticate('jwt', { session: false }), async (ctx:any) => 
{
    const { _id } = ctx.params;
    const user = ctx.state.user._id;

    await Post.findOneAndRemove({ _id, user });
    ctx.body = { message: 'Success: Post has been deleted!' };
});

module.exports = router.routes();