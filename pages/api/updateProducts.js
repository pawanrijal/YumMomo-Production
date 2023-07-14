import Product from "../../models/product.js";
import connectDb from "../../middleware/mongoose.js";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = await Product.findByIdAndUpdate(req.body[i]._id,req.body[i]);
    }
    res.status(200).json({success : "success"});
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
};

export default connectDb(handler);
