const Order = require('../models/Order');

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id })
            .populate({
                path: 'items.menuId',
                populate: { path: 'userId', select: 'name' }
            });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addOrder = async (req, res) => {
    const { name, email, items, totalPrice } = req.body;
    try {
        const order = await Order.create({ 
            userId: req.user.id, 
            name: name || req.user.name, 
            email: email || req.user.email, 
            items, 
            totalPrice 
        });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        let order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.name = req.body.name || order.name;
        order.email = req.body.email || order.email;

        await order.save();

        const updatedOrder = await Order.findById(order._id).populate({
            path: 'items.menuId',
            populate: { path: 'userId', select: 'name' }
        });

        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        await order.deleteOne();
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getOrders, addOrder, updateOrder, deleteOrder };
