import Feedback from '../../models/Feedback';
import connectDb from '../../middleware/mongoose';

const handler = async (req, res) => {
    if(req.method === 'POST'){
        const {name, email, message} = req.body;
        if(!name || !email || !message){
            return res.status(422).json({error: "Please fill all the fields"})
        }
        const feedback = new Feedback({
            name, email, message
        })
        await feedback.save()
        .then(()=>{
            res.status(201).json({message: "Feedback sent successfully"})
        }
        )
        .catch((err)=>{
            res.status(500).json({error: "You have already sent a feedback"})
        }
        )
    }
}

export default connectDb(handler)