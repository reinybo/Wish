const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    link: String,
    title: String,
    store: String,
    imageLink: String,
    tags: [],
    wishList: String
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;