import mongoose from 'mongoose';
import { isEmail } from 'helpers/email';

const subscriptionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: isEmail,
        },
    },
});

export default mongoose.models.Subscription ||
    mongoose.model('Subscription', subscriptionSchema);
