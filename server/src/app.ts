require('dotenv').config();

const koa = require('koa');

const config = require('./lib/config');
const handlers = require('./handlers');
const controllers = require('./controllers')
const db = require('./lib/db');

const app = new koa();

Object.keys(handlers).forEach((key) => app.use(handlers[key]));

app.use(controllers.routes());
app.use(controllers.allowedMethods());
db();

app.listen(config.port, () => console.log(`Success: Server has been started on port ${config.port}!`));
