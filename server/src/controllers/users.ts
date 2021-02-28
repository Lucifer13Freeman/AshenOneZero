export {};

const Router = require('koa-router');
const User = require('../models/User');


const router = new Router().prefix('/users');

router.get('/:_id', async (ctx:any) => 
{
    const { _id } = ctx.params;
    const user = await User.findById(_id);

    if (user) ctx.body = user;
    else ctx.throw(404, 'Error: User has not been found!');
});

module.exports = router.routes();