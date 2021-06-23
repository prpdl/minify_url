import mongoose, { Schema } from 'mongoose';
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
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
},
{timestamps: true})

const Url = mongoose.model("Url", urlSchema);
export default Url;
