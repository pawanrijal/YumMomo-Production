import Product from "../../models/Product.js";
import connectDb from "../../middleware/mongoose.js";

const handler = async (req, res) => {
  if (req.method == "DELETE") {
    let p = await Product.findByIdAndDelete(req.body._id);
    res.status(200).json({success : "success"});
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
};

export default connectDb(handler);