import mongoose from 'mongoose'


const UserSchema = mongoose.Schema({
    // username of the user
    username:{
        type: String,
        required: true,
        unique: true
    },
    // password of the user
    password:{
        type: String,
        required: true
    },

}, {timestamps: true});


export const User = mongoose.model('User', UserSchema);