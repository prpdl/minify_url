import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
                    
        type: String,  
        unique: true

    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    address: {
        type: String
    },
    Occupation: {
        type: String
    },
    income: {
        type: Number
    }
})

const User = mongoose.model("User", userSchema);

export default User;