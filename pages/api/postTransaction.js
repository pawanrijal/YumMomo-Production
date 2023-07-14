import connectDb from "../../middleware/mongoose.js";
import Order from "../../models/Order.js";


const  handler = async(req, res) => {
    res.redirect('/order?id=' + Order._id);
    };

export default connectDb(handler);



