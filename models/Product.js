const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    desc: {type: String, required: true},
    image: {type: String},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    availableQty: {type: Number},
    address: {type: String},
    status: {type: String, default: 'pending', required: true},
}, {timestamps: true});

mongoose.models = {};

export default mongoose.model('Product', ProductSchema)
