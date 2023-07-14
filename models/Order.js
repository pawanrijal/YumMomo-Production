const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderId: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    products: {type: Object, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    phone: {type: Number, required: true},
    Total: {type: Number, required: true},
    phone: {type: Number, required: true},
}, {timestamps: true});

mongoose.models = {};


export default mongoose.model('Order', OrderSchema)