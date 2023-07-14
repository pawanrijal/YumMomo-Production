import React from 'react'
import connectDb from "../../middleware/mongoose.js";
import Order from "../../models/Order.js";

const handler = async (req, res) => {
    
    if (req.method == "POST") {
        let o = new Order({
            orderId: "OID" + Math.floor(Math.random() * 1000000000),
            email: req.body.email,
            name: req.body.name,
            products: req.body.products,
            address: req.body.address,
            city: req.body.city,
            phone: req.body.phone,
            Total: req.body.Total,
            phone: req.body.phone,
        });
        await o.save();
        res.status(200).json({success: "success", data: o});
    } else {
        res.status(400).json({ error: "Invalid request" });
    }
  };
  
  export default connectDb(handler);