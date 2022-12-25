const express = require('express');
const Product = require('../models/product.js');
const router = express.Router();


//INDEX
router.get('/', (req, res) => {
	Product.find({}, (err, foundProducts) => {
		res.render('products/index.ejs', {
			products: foundProducts
		});
	});
});



// NEW
router.get('/new', (req, res) => {
    res.render('products/new.ejs', {
    });
});


module.exports=router;