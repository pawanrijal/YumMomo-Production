import connectDb from '../../middleware/mongoose.js'
import jwt from 'jsonwebtoken'
import User from '../../models/User.js'

const handler = async (req, res) => {
    if(req.method == "POST"){
        let token = req.body.data.token
        let user = jwt.verify(token, process.env.JWT_SECRET)
        const dbuser = await User.findOne({email: user.email})
        const {name, email, address, phone, } = dbuser
        res.status(200).json({ name, email, address, phone})
    }
    else{
        res.status(400).json({ user: "no user" })
    }
}

export default connectDb(handler)
  