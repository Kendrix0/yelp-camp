const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// User model
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
});
// Adds field for username, password, and makes sure they are unique. Also adds methods.
UserSchema.plugin(passportLocalMongoose);
// Compiles User model based on the defined schema
module.exports = mongoose.model('User', UserSchema);
