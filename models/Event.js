import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.models.Event || mongoose.model('Event', eventSchema);
