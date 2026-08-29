
const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Menu', menuSchema);
