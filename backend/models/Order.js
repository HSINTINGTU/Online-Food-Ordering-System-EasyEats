
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    items: [
        {
            menuId: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
            quantity: { type: Number, required: true, min: 1 }
        }
    ],
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
        type: String,
        enum: ['Pending', 'Preparing', 'Delivered', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
