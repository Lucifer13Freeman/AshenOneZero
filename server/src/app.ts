require('dotenv').config();

const koa = require('koa');

const config = require('./lib/config');
const handlers = require('./handlers');
const controllers = require('./controllers')
const db = require('./lib/db');

const app = new koa();

//console.log(handlers);

//handlers.forEach((h:any) => {console.log(h);});

Object.keys(handlers).forEach((key) => app.use(handlers[key]));

//Object.keys(handlers).forEach(key => { app.use(handlers[key]); });

//for (let i = 0; i < handlers.length; i++) console.log(handlers[i]);

//handlers.forEach((h:any) => app.use(h));

app.use(controllers.routes());
app.use(controllers.allowedMethods());
db();

app.listen(config.port, () => console.log(`Success: Server has been started on port ${config.port}!`));
