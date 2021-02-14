export {};

const Router = require('koa-router');
const argon2 = require('argon2');
//const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const config = require('../lib/config');

const router = new Router().prefix('/auth');

router.post('/register', async (ctx:any) => 
{
    const { name, surname, patronymic, email, password } = ctx.request.body;

    const user = await User.findOne({email});

    if (user) ctx.throw(400, 'Error: Email already exists!');

    //const salt = await bcrypt.genSalt(10);
    //const hash = await bcrypt.hash(password, salt);

    const hash = await argon2.hash(password);

    await new User({ name, surname, patronymic, email, password: hash }).save();

    ctx.status = 201;  // user created successfully
});

router.post('/login', async (ctx:any) => 
{
    const { email, password } = ctx.request.body;
    const user = await User.findOne({ email });

    if (!user) ctx.throw(400, 'Error: User with this email does not exists!');

    //const is_match = await bcrypt.compare(password, user.password);

    const is_match = await argon2.verify(user.password, password);

    if (is_match)
    {
        const payload = {

            id: user.id,
            name: user.name,
            surname: user.surname, 
            patronymic: user.patronymic,
            email: user.email
        };

        const token = jwt.sign(payload, config.secret, {expiresIn: 3600 * 24});

        ctx.body = { token: `Bearer ${token}` };
    }
    else ctx.throw(400, 'Error: Password incorrect!');
});

module.exports = router.routes();