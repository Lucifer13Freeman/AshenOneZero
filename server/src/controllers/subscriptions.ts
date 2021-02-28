export {};

const Router = require('koa-router');
const passport = require('koa-passport');

const Subscription = require('../models/Subscription');


const router = new Router().prefix('/subscriptions');

router.post('/', passport.authenticate('jwt', { session: false }), async (ctx:any) => 
{
    const { profile } = ctx.request.body;
    const subscriber = ctx.state.user._id;

    const check_subscription = await Subscription.findOne({ subscriber, profile });

    if (check_subscription) ctx.throw(400, 'Error: You have already subscribed!');

    ctx.body = await new Subscription({ subscriber, profile }).save();

    ctx.status = 201;
});

router.get('/', async (ctx:any) => 
{
    ctx.body = await Subscription.find(ctx.query);
});

router.delete('/:_id', passport.authenticate('jwt', { session: false }), async (ctx:any) => 
{
    const {_id} = ctx.params;
    const subscriber = ctx.state.user._id;

    await Subscription.findOneAndDelete({ _id, subscriber });

    ctx.body = { message: 'Success: You was unsubscribed!'};
});

module.exports = router.routes();