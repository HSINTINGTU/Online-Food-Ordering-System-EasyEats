
const express = require('express');
const { getOrders, addOrder, updateOrder, deleteOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getOrders).post(protect, addOrder);
router.route('/:id').put(protect, updateOrder).delete(protect, deleteOrder);

module.exports = router;
