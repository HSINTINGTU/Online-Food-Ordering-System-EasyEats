const Menu = require('../models/Menu');

const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find({ userId: req.user.id });
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addMenu = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const menu = await Menu.create({
            userId: req.user.id,
            name,
            description,
            price
        });
        res.status(201).json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMenu = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) return res.status(404).json({ message: 'Menu item not found' });
        
        menu.name = name || menu.name;
        menu.description = description || menu.description;
        menu.price = price ?? menu.price;
        
        const updatedMenu = await menu.save();
        res.json(updatedMenu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) return res.status(404).json({ message: 'Menu item not found' });
        
        await menu.deleteOne();
        res.json({ message: 'Menu item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMenus, addMenu, updateMenu, deleteMenu };
