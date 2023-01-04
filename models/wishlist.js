const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wishlistSchema = new Schema({
    wishList: String
}, {timestamps: true});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

