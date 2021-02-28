const koa_static = require('koa-static');


module.exports = process.env.NODE_ENV === 'production' ?
                ('../../../client/build') : (ctx:any, next:any) => next();