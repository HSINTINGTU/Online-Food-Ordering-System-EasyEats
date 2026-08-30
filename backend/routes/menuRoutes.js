const express = require('express');
const { getMenus, getMyMenus, addMenu, updateMenu, deleteMenu } = require('../controllers/menuController');
const { protect, managerOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getMenus).post(protect, managerOnly, addMenu);
router.route('/my-menus').get(protect, managerOnly, getMyMenus);
router.route('/:id').put(protect, managerOnly, updateMenu).delete(protect, managerOnly, deleteMenu);

module.exports = router;
