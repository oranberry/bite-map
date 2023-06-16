const express = require('express');
const router = express.Router();
const restaurants = require('../controllers/restaurants');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateRestaurant } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const Restaurant = require('../models/restaurant');

router.route('/')
    .get(catchAsync(restaurants.index))
    .post(isLoggedIn, upload.array('image'), validateRestaurant, catchAsync(restaurants.createRestaurant))

router.get('/new', isLoggedIn, restaurants.renderNewForm)

router.route('/:id')
    .get(catchAsync(restaurants.showRestaurant))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateRestaurant, catchAsync(restaurants.updateRestaurant))
    .delete(isLoggedIn, isAuthor, catchAsync(restaurants.deleteRestaurant));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(restaurants.renderEditForm))

// router.get('/', catchAsync(async (req, res) => {
//     const restaurants = await Restaurant.find({});
//     res.render('restaurants/index', { restaurants })
// }));

// router.get('/new', isLoggedIn, (req, res) => {
//     res.render('restaurants/new');
// })


// router.post('/', isLoggedIn, validateRestaurant, catchAsync(async (req, res, next) => {
//     const restaurant = new Restaurant(req.body.restaurant);
//     restaurant.author = req.user._id;
//     await restaurant.save();
//     req.flash('success', 'Successfully made a new restaurant!');
//     res.redirect(`/restaurants/${restaurant._id}`)
// }))

// router.get('/:id', catchAsync(async (req, res,) => {
//     const restaurant = await Restaurant.findById(req.params.id).populate({
//         path: 'reviews',
//         populate: {
//             path: 'author'
//         }
//     }).populate('author');
//     console.log(restaurant);
//     if (!restaurant) {
//         req.flash('error', 'Cannot find that restaurant!');
//         return res.redirect('/restaurants');
//     }
//     res.render('restaurants/show', { restaurant });
// }));

// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const restaurant = await Restaurant.findById(id)
//     if (!restaurant) {
//         req.flash('error', 'Cannot find that restaurant!');
//         return res.redirect('/restaurants');
//     }
//     res.render('restaurants/edit', { restaurant });
// }))

// router.put('/:id', isLoggedIn, isAuthor, validateRestaurant, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const restaurant = await Restaurant.findByIdAndUpdate(id, { ...req.body.restaurant });
//     req.flash('success', 'Successfully updated restaurant!');
//     res.redirect(`/restaurants/${restaurant._id}`)
// }));

// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
//     const { id } = req.params;
//     await Restaurant.findByIdAndDelete(id);
//     req.flash('success', 'Successfully deleted restaurant')
//     res.redirect('/restaurants');
// }));

module.exports = router;