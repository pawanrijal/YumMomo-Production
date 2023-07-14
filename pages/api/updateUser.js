import connectDb from '../../middleware/mongoose.js'
import jwt from 'jsonwebtoken'
import User from '../../models/User.js'

const handler = async (req, res) => {
    if(req.method == "POST"){
        let token = req.body.data.token
        let user = jwt.verify(token, process.env.JWT_SECRET)
        const dbuser = await User.findOneAndUpdate({email: user.email}, {address: req.body.data.address, phone: req.body.data.phone, name: req.body.data.name}, {new: true})
        res.status(200).json({ success: "success", data: dbuser})
    }
    else{
        res.status(400).json({ user: "no user" })
    }
}

export default connectDb(handler)
  