const express = require('express');
const router = express.Router();

const {rejectOrder, approveOrder, getOrders} = require('../controllers/managerController');
const { isManager, protect } = require('../middlewares/authMiddleware');

router.post('/approve-order/:orderId', protect, isManager, approveOrder);
router.post('/reject-order/:orderId', protect, isManager, rejectOrder);
router.get('/orders', protect, isManager, getOrders);

module.exports = router;