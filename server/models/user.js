import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    oneTimeCode: String,
    oneTimeCodeExpiry: Date,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;