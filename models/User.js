import mongoose from 'mongoose';
import { hash, genSalt, compare } from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.hashPassword = async password => {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
};

userSchema.methods.comparePassword = async function (canidatePassword) {
    let valid;
    try {
        valid = await compare(canidatePassword, this.password);
        return valid;
    } catch (err) {
        console.log(err);
        return false;
    }
};

userSchema.pre('save', async function (next) {
    try {
        if (this.createdAt === this.updatedAt) {
            this.password = await this.hashPassword(this.password);
        }

        next();
    } catch (err) {
        next(err);
    }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
