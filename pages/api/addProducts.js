import Product from "../../models/Product.js";
import connectDb from "../../middleware/mongoose.js";

const handler = async (req, res) => {
  if (req.method == "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = new Product({
        title: req.body[i].title,
        slug: req.body[i].slug,
        desc: req.body[i].desc,
        image: req.body[i].image,
        category: req.body[i].category,
        price: req.body[i].price,
        availableQty: req.body[i].availableQty,
      });
      await p.save();
    }
    res.status(200).json({Products: req.body});
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
};

export default connectDb(handler);
