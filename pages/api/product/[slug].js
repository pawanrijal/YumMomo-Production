import Product from "../../../models/Product.js";
import connectDb from "../../../middleware/mongoose.js";

async function handler(req, res) {
  if (req.method == "GET") {
    const { slug } = req.query;
    try {
      const product = await Product.findOne({ slug });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
}
export default connectDb(handler);
