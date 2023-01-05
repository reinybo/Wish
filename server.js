// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const Product = require('./models/product.js');


// Database Configuration
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// Middleware
// Body parser middleware: give us access to req.body
app.use(methodOverride('_method'));
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
}));

// Routes / Controllers
const userController = require('./controllers/users');
app.use('/users', userController);

const sessionsController = require('./controllers/sessions');
app.use('/sessions', sessionsController);

const productController = require('./controllers/products');
app.use('/product', productController);



app.get('/', (req, res) => {
	if (req.session.currentUser) {
        Product.find({}, (err, foundProducts) => {
            res.render('dashboard.ejs', {
                products: foundProducts,             
			    currentUser: req.session.currentUser
        })});
	} else {
		res.render('sessions/new.ejs', {
			currentUser: req.session.currentUser
		});
	}
});




// Listener
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));