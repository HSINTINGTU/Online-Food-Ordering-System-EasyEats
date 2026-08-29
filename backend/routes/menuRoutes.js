
const express = require('express');
const { getMenus, addMenu, updateMenu, deleteMenu } = require('../controllers/menuController');
const { protect, managerOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getMenus).post(protect, managerOnly, addMenu);
router.route('/:id').put(protect, managerOnly, updateMenu).delete(protect, managerOnly, deleteMenu);

module.exports = router;
