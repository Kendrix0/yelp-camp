const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Review model
const reviewSchema = new Schema({
    body: String,
    rating: Number,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
// Compiles Review model based on the defined schema
module.exports = mongoose.model('Review', reviewSchema);