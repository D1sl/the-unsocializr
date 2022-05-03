const { DateTime } = require('luxon');
const { Schema, model, Types } = require('mongoose');

// Reaction schema must be declared before Thought schema, because the thought schema references it and it can't reference something that hasn't yet been declared.
const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // Use Luxon to format date and time
            get: (createdAtVal) => 
            DateTime.fromJSDate(createdAtVal).toLocaleString(DateTime.DATETIME_MED)
        }
    },
    {
        toJSON: {
            // To enable it, we must specify that getters are being used.
            getters: true
        }
    }
)

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => 
            DateTime.fromJSDate(createdAtVal).toLocaleString(DateTime.DATETIME_MED)
        },
        username: {
            type: String,
            required: true
        },
        // Reference to ReactionSchema
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            // Virtuals are being used to display the total number of reactions
            virtuals: true,
            getters: true,
            id: false
        }
    }
)

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;