const mongoose_error = require('mongoose').Error;


module.exports = async (ctx:any, next:any) =>
{
    try
    {
        await next()
    }
    catch (e)
    {
        if (e instanceof mongoose_error) ctx.throw(400, 'Error: Bad Request!');
        else ctx.throw(e);
    }
};