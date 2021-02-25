const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const private_paths = require('mongoose-private-paths');

const user_schema = new Schema(
{
    surname:
    {
        type: String,
        required: true
    },
    name:
    {
        type: String,
        required: true
    },
    patronymic:
    {
        type: String,
        required: false
    },
    email:
    {
        type: String,
        required: true,
        unique: true
    },
    password:
    {
        type: String,
        required: true,
        private: true,
    },
    role:
    {
        type: String,
        required: true,
        default: 'USER'
    },
    created_date:
    {
        type: Date,
        default: Date.now
    }
});

user_schema.plugin(private_paths);

module.exports = mongoose.model('users', user_schema);