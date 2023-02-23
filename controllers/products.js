const express = require('express');
const Product = require('../models/product.js');
const router = express.Router();
const User = require('../models/user.js');


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

//DELETE
router.delete('/:id', (req, res) => {
	Product.findByIdAndRemove(req.params.id, () => {
		res.redirect('/');
	});
});


//UPDATE
router.put('/:id', (req, res) => {
	Product.findByIdAndUpdate(req.params.id, req.body, () => {
		res.redirect('/product/'+req.params.id);
	});
});



//CREATE
router.post('/', (req, res) => {
    Product.create(req.body, (err, createdProduct) => {
        res.redirect('/product');
    });
});


//EDIT
router.get('/:id/edit', (req, res) => {
	Product.findById(req.params.id, (err, foundProduct) => {
		res.render('products/edit.ejs', {
			product: foundProduct
		});
	});
});


//SHOW
router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
		res.render('products/show.ejs', {
			product: foundProduct,
		})
    });
});


// Wishlist Routing/Controllers

//SHOW
router.get('/wishlist/:name', (req, res) => {
	Product.find({wishList: req.params.name}, (err, wishlistProducts) => {
		res.render('wishLists/show.ejs', {
			wishlistProducts
		});
	});
});




module.exports=router;