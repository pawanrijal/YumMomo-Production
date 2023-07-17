import connectDb from "../../middleware/mongoose.js";
import Admin from "../../models/Admin.js";
import CryptoJS from "crypto-js";


const handler = async (req, res) => {
  if (req.method == "POST") {
    const {name, email} = req.body;
    let a = new Admin({name, email, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString()});
    await a.save();
    res.status(200).json({success: "success"});
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
};

export default connectDb(handler);
