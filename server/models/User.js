import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
    },
    avatar: {
        type: String,
        required: false,
    },
    college: {
        type: String,
        required: false,
    },
    branch: {
        type: String,
        required: false,
    },
    year: {
        type: String,
        required: false,
    },
    skills: {
        type: [String],
        required: false,
    },
    projects: [
        {
            title: String,
            description: String,
            link: String,
        },
    ],
    socialLinks: [
        {
            platform: String,
            url: String,
        },
    ],
    resume: {
        type: String,
        required: false,
    },

}, {
    timestamps: true,
});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (password) {
    const res = await bcrypt.compare(password, this.password);
    return res;
};



export default mongoose.model('User', userSchema);