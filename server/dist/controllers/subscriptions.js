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
const Subscription = require('../models/Subscription');
const router = new Router().prefix('/subscriptions');
router.post('/', passport.authenticate('jwt', { session: false }), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { profile } = ctx.request.body;
    const subscriber = ctx.state.user._id;
    const check_subscription = yield Subscription.findOne({ subscriber, profile });
    if (check_subscription)
        ctx.throw(400, 'Error: You have already subscribed!');
    ctx.body = yield new Subscription({ subscriber, profile }).save();
    ctx.status = 201;
}));
router.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = yield Subscription.find(ctx.query);
}));
router.delete('/:_id', passport.authenticate('jwt', { session: false }), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = ctx.params;
    const subscriber = ctx.state.user._id;
    yield Subscription.findOneAndDelete({ _id, subscriber });
    ctx.body = { message: 'Success: You was unsubscribed!' };
}));
module.exports = router.routes();
