import mongoose from 'mongoose';
import shortId from 'shortid';



const urlSchema = new mongoose.Schema({
    full: {
        type: String,
        required: true,
        unique: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})

const Url = mongoose.model("Url", urlSchema);
export default Url;