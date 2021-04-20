import User from "../model/user"
import 'core-js/features/promise'
import 'regenerator-runtime/runtime'



export const getUsers = () => {

}

export const createUser = async (req, res) => {
    const { email, firstName, lastName, address, occupation, income } = req.body;
    const newUser = new User({ email, firstName, lastName, address, occupation, income });

    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}