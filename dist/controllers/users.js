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
const User = require('../models/User');
const router = new Router().prefix('/users');
router.get('/:_id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = ctx.params;
    const user = yield User.findById(_id);
    if (user)
        ctx.body = user;
    else
        ctx.throw(404, 'Error: User has not been found!');
}));
module.exports = router.routes();
