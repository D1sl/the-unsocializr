const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            // Match email using RegEx
            match: /.+\@.+\..+/
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                // References self to create friendship connections
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            id: false
        }
    }
)

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

const User = model('User', UserSchema);

module.exports = User;