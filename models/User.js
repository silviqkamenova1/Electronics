const mongoose = require('mongoose');

const NAME_PATTERN = /^[a-zA-Z-]+$/;
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: [3, "Username must be at least 3 characters"],
        required:  [true, 'Username name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: [10, "Email must be at least 10 characters"],

    },
    password: {
        type: String,
        minLength: [4, 'Password must be at least 4 characters'],
        required: [true, 'Password is required']
    },

})
const User = mongoose.model('User', userSchema);
module.exports = User;
