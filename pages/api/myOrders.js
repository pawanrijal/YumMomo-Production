import connectDb from "../../middleware/mongoose.js";
import Order from "../../models/Order.js";
import JsonWebToken from "jsonwebtoken";

const handler = async (req, res) => {
    const token = req.body.token
    const data = JsonWebToken.verify(token, process.env.JWT_SECRET);
    const orders = await Order.find({email: data.email});
    res.status(200).json({success: true, orders});
};

export default connectDb(handler);
