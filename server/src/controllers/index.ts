const Router = require('koa-router');

const auth = require('./auth');
const posts = require('./posts');
const posts_likes = require('./posts-likes');
const posts_comments = require('./posts-comments');
const subscriptions = require('./subscriptions');
const users = require('./users');

const router = new Router().prefix('/api');

router.use(auth, posts, posts_likes, posts_comments, subscriptions, users);

module.exports = router;