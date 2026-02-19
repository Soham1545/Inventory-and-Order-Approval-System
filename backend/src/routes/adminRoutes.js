const express = require('express');
const router = express.Router();

const {invite, createProduct, editProduct, deleteProduct, getProduct, getProducts, getUsers} = require('../controllers/adminController');
const { isAdmin, protect } = require('../middlewares/authMiddleware');

router.post('/invite', protect, isAdmin, invite);
router.get('/users', protect, isAdmin, getUsers);
router.post('/product', protect, isAdmin, createProduct);
router.patch('/product/:sku', protect, isAdmin, editProduct);
router.delete('/product/:sku', protect, isAdmin, deleteProduct);
router.get('/products', protect, getProducts);
router.get('/product/:sku', protect, getProduct);

module.exports = router;