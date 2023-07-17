import connectDb from "../../middleware/mongoose.js";
import Admin from "../../models/Admin.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";


const handler = async (req, res) => {
  if (req.method == "POST") {
    let admin = await Admin.findOne({ email: req.body.email });
    if (admin){
    const bytes = CryptoJS.AES.decrypt(admin.password, process.env.AES_SECRET);
    const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
        if (req.body.email === admin.email && req.body.password == decryptedPass) {
          const token = jwt.sign({success: true, email:admin.email}, process.env.JWT_SECRET);
          res.status(200).json({success: true, token, email: admin.email});
        }
        else {
        res.status(400).json({success: false, error: "Invalid Credentials"});
        }
    }
    else {
      res.status(400).json({success:false, error: "Please Register First and Login" });
    }
  } 
};

export default connectDb(handler);
