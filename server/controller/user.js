import User from "../model/user"
import mongoose from 'mongoose'
import 'core-js/features/promise'
import 'regenerator-runtime/runtime'

export const getUsers = async (req, res) => {
    try {
        const id = req.params.id
        if (id) {
            console.log('id true')
            if (!mongoose.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Invalid Object ID' });
                return;
            }
            const validUser = await User.find({ _id: mongoose.Types.ObjectId(id) })
                .catch((error) => { 
                    res.status(404).json({message: error.message})
                    return;
                });
                console.log(typeof(validUser))
                (validUser ? res.json(validUser) : res.status(404).json({ message: 'User doesn\'t exist.' }))

        } else {
            const allUsers = await User.find()
                .catch(error => res.status(404).json({message: error.message}))
                res.status(200).json(allUsers)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const createUser = async (req, res) => {
    const { email, firstName, lastName, address, occupation, income } = req.body;
    const newUser = new User({ email, firstName, lastName, address, occupation, income });

    try {
        await newUser.save()
            .then(() => {
                res.status(201).json(newUser);
            })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}