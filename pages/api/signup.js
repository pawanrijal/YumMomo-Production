import connectDb from "../../middleware/mongoose.js";
import User from "../../models/User.js";
import CryptoJS from "crypto-js";


const handler = async (req, res) => {
  if (req.method == "POST") {
    const {name, email} = req.body;

    let u = new User({name, email, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString()});
    await u.save();
    res.status(200).json({success: "success"});
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
};

export default connectDb(handler);
