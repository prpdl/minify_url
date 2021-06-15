import { async } from "regenerator-runtime";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../model/user'

import validateRegisterInput from '../validation/register';
import validateLoginInput from '../validation/login';
import dotenv from 'dotenv';

dotenv.config();

export const addUser = async (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
   
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: 'User already exists.' })
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            //Hash Password
            bcrypt.genSalt(10, (err, salt) => {
                if(err) throw err
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.redirect(307, '/api/user/login'))
                        .catch(err => console.log(err))
                })
            })
        }
    })
}

export const loginUser = async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    if (!isValid) {
        return res.status(403).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    const user = User.findOne({email: email}, (err, user) => {
        if(!err) {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    //User Matched and need to create a JWT payload
    
                    const payload = {
                        id: user._id,
                        name: user.name
                    };
    
                    //Sign the token
    
                    jwt.sign(
                        payload,
                        keys.secret,
                        {
                            expiresIn: 604800
                        },
                        (err, token) => {
                            res.json({
                                sucess: true,
                                token: "Bearer " + token
                            })
                        }
                    )
    
                } else {
                    return res.status(400).json({ password: 'Incorrect Password' })
                }
            })
        }else{
            console.log(err)
        }
    }) 
        //Checking For Password

        
}

// import fs from 'fs'
// import path from 'path'
// import { v4 as uuidv4} from 'uuid'
// import { body, validationResult } from 'express-validator'





// const __dirname = path.resolve('')

// export const validate = (method) => {
//     switch (method) {
//         case 'addUser': {
//             return [
//                 body('name', 'name doesn\'t exist').exists(),
//                 body('email', 'Invalid Email').exists().isEmail(),
//                 body('phone').optional().isInt(),
//                 body('department', 'Depatrment should be one of IT, HR, FD, PD').exists().isIn(['IT', 'HR', 'FD', 'PD'])
//             ]
//         }
//     }
// }

// const getFileContent = () => {
//     let users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf8'));
//     if (typeof (users) === 'object') {
//         return users;
//     } else {
//         return false;
//     }
// }

// const findUser = (id) => {
//     let { users } = getFileContent();
//     return users.find(user => user.id === parseInt(id));
// }

// export const getUsers = (req, res) => {
//     try {
//         const id = req.params.id;
//         const { users } = getFileContent();
//         if (id) {
//             let user = findUser(id)
//             if (user) {
//                 res.status(200).json(findUser(id))
//             } else {
//                 res.status(404).json({ message: 'No User Found' })
//             }
//         }
//         else if (users && users !== null && users.length > 0) {

//             res.status(200).send(users);

//         } else {
//             res.status(404).json({
//                 message: 'Users Not Found!'
//             })
//         }
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             message: 'Server responded with an error'
//         })
//     }
// }


// export const addUser = (req, res) => {
//     let errors = validationResult(req)
//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             errors: errors.array()
//         });
//     }

//     try {
//         let user = req.body
//         let users = getFileContent();
//         user.id = uuidv4();
//         if (!findUser(user.id)) {
//             users.users.push(user);
//             fs.writeFile(__dirname + '/users.json', JSON.stringify(users, null, 2), (err) => {
//                 if (err) {
//                     console.log(`[ERR] ${err}`);
//                     res.status(500).json({
//                         message: 'Server Responded With Error'
//                     })
//                 }
//             });
//             res.status(200).json({ message: `added user with id ${user.id}` })
//         } else {
//             res.status(404).send('User Must have an uniqe id')
//         }
//     } catch (error) {
//         console.log(`[Err] ${error}`)
//         res.status(500).json({
//             message: 'Server Responded With Error'
//         })
//     }
// }

// export const updateUser = (req, res) => {
//     try {
//         const users = getFileContent();
//         const data = req.body;
//         const keys = Object.keys(data)
//         const id = req.params.id;
//         const user = findUser(id);
//         if (user) {
//             users.users.map(u => {
//                 if (u.id == id) {
//                     keys.forEach(key => {
//                         u[key] = data[key]
//                     })
//                 }
//             })
//         }
//         fs.writeFile(__dirname + '/users.json', JSON.stringify(users, null, 2), (err) => {
//             if (err) {
//                 console.log(err)
//                 res.status(500).json({
//                     message: 'server responded with error'
//                 })
//             }
//         })

//         res.status(200).json({
//             message: 'user updated'
//         })
//     } catch (error) {
//         console.log(`[Err] ${error}`)
//         res.status(500).json({
//             message: 'Server Responded With Error'
//         })
//     }

// }

// export const deleteUser = (req, res) => {
//     try {
//         const id = req.params.id
//         let users = getFileContent();
//         if (findUser(id)) {
//             const filterUser = {
//                 users: users.users.filter(user => user.id !== parseInt(id))
//             }
//             fs.writeFile(__dirname + '/users.json', JSON.stringify(filterUser, null, 2), (err) => {
//                 if (err) {
//                     console.log(`[ERR] ${err}`);
//                     res.status(500).json({
//                         message: 'Server Responded With Error'
//                     })
//                 }
//             });
//             res.status(200).json({ message: `user deleted with id ${id}` })
//         } else {
//             res.status(404).json({
//                 message: 'User not found'
//             })
//         }
//     } catch (error) {
//         console.log(`[Err] ${error}`)
//         res.status(500).json({
//             message: 'Server Responded With Error'
//         })
//     }
// }