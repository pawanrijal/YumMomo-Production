import Product from  '../../models/Product.js'
import connectDb from '../../middleware/mongoose.js'

const handler = async (req, res) => {
    const products = await Product.find()
    res.status(200).json({ products })
}

export default connectDb(handler)
  