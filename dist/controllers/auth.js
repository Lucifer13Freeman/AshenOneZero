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
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../lib/config');
const router = new Router().prefix('/auth');
router.post('/register', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, surname, patronymic, email, password } = ctx.request.body;
    const user = yield User.findOne({ email });
    if (user)
        ctx.throw(400, 'Error: Email already exists!');
    const hash = yield argon2.hash(password);
    yield new User({ name, surname, patronymic, email, password: hash }).save();
    ctx.status = 201;
}));
router.post('/login', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = ctx.request.body;
    const user = yield User.findOne({ email });
    if (!user)
        ctx.throw(400, 'Error: User with this email does not exists!');
    const is_match = yield argon2.verify(user.password, password);
    if (is_match) {
        const payload = {
            id: user.id,
            name: user.name,
            surname: user.surname,
            patronymic: user.patronymic,
            email: user.email
        };
        const token = jwt.sign(payload, config.secret, { expiresIn: 3600 * 24 });
        ctx.body = { token: `Bearer ${token}` };
    }
    else
        ctx.throw(400, 'Error: Password incorrect!');
}));
module.exports = router.routes();
