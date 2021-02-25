export {};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post_schema = new Schema(
{
    user:
    {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    body:
    {
        type: String,
        required: true
    },
    likes:
    [
        {
            user:
            {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: true
            },
            created_date:
            {
                type: Date,
                default: Date.now
            }
        }
    ],
    comments:
    [
        {
            user:
            {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: true
            },
            body:
            {
                type: String,
                required: true
            },
            created_date:
            {
                type: Date,
                default: Date.now
            }
        }
    ],
    created_date:
    {
        type: Date,
        default: Date.now
    }
});

const population_fields = 'user comments.user';

post_schema.post('save', async (doc:any) =>
{
    await doc.populate(population_fields).execPopulate();
});

function populate_fields(this:any)
{
    this.populate(population_fields);
}

post_schema.pre('find', populate_fields);
post_schema.pre('findOne', populate_fields);
post_schema.pre('findOneAndUpdate', populate_fields);

module.exports = mongoose.model('posts', post_schema);