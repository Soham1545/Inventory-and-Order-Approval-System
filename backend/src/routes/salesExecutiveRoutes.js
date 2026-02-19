const express = require('express');
const router = express.Router();

const {createOrder, getOrdersByUser} = require('../controllers/salesExecutiveController');
const { isSalesExecutive, protect } = require('../middlewares/authMiddleware');

router.post('/order', protect, isSalesExecutive, createOrder);
router.get('/user-orders', protect, isSalesExecutive, getOrdersByUser);

module.exports = router;