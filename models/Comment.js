import mongoose from 'mongoose';
import User from './User';

const commentSchema = new mongoose.Schema(
    {
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        userEmail: {
            type: String,
            required: true,
        },
        userName: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
    }
);

commentSchema.virtual('email').get(async function () {
    let user = await User.findById(this.userId);
    if (user) {
        return user.email;
    }

    return null;
});

commentSchema.virtual('name').get(async function () {
    let user = await User.findById(this.userId);
    if (user) {
        return user.username;
    }

    return null;
});

export default mongoose.models.Comment ||
    mongoose.model('Comment', commentSchema);
