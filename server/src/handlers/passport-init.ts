const passport = require('koa-passport');
const passport_config = require('../lib/passport-config');

passport_config(passport);

module.exports = passport.initialize();