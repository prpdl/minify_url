import fs from 'fs'
import path from 'path'
import { v4 as uuidv4} from 'uuid'
import { body, validationResult } from 'express-validator'


const __dirname = path.resolve('')

export const validate = (method) => {
    switch (method) {
        case 'addUser': {
            return [
                body('name', 'name doesn\'t exist').exists(),
                body('email', 'Invalid Email').exists().isEmail(),
                body('phone').optional().isInt(),
                body('department', 'Depatrment should be one of IT, HR, FD, PD').exists().isIn(['IT', 'HR', 'FD', 'PD'])
            ]
        }
    }
}

const getFileContent = () => {
    let users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf8'));
    if (typeof (users) === 'object') {
        return users;
    } else {
        return false;
    }
}

const findUser = (id) => {
    let { users } = getFileContent();
    return users.find(user => user.id === parseInt(id));
}

export const getUsers = (req, res) => {
    try {
        const id = req.params.id;
        const { users } = getFileContent();
        if (id) {
            let user = findUser(id)
            if (user) {
                res.status(200).json(findUser(id))
            } else {
                res.status(404).json({ message: 'No User Found' })
            }
        }
        else if (users && users !== null && users.length > 0) {

            res.status(200).send(users);

        } else {
            res.status(404).json({
                message: 'Users Not Found!'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Server responded with an error'
        })
    }
}


export const addUser = (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    try {
        let user = req.body
        let users = getFileContent();
        user.id = uuidv4();
        if (!findUser(user.id)) {
            users.users.push(user);
            fs.writeFile(__dirname + '/users.json', JSON.stringify(users, null, 2), (err) => {
                if (err) {
                    console.log(`[ERR] ${err}`);
                    res.status(500).json({
                        message: 'Server Responded With Error'
                    })
                }
            });
            res.status(200).json({ message: `added user with id ${user.id}` })
        } else {
            res.status(404).send('User Must have an uniqe id')
        }
    } catch (error) {
        console.log(`[Err] ${error}`)
        res.status(500).json({
            message: 'Server Responded With Error'
        })
    }
}

export const updateUser = (req, res) => {
    try {
        const users = getFileContent();
        const data = req.body;
        const keys = Object.keys(data)
        const id = req.params.id;
        const user = findUser(id);
        if (user) {
            users.users.map(u => {
                if (u.id == id) {
                    keys.forEach(key => {
                        u[key] = data[key]
                    })
                }
            })
        }
        fs.writeFile(__dirname + '/users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.log(err)
                res.status(500).json({
                    message: 'server responded with error'
                })
            }
        })

        res.status(200).json({
            message: 'user updated'
        })
    } catch (error) {
        console.log(`[Err] ${error}`)
        res.status(500).json({
            message: 'Server Responded With Error'
        })
    }

}

export const deleteUser = (req, res) => {
    try {
        const id = req.params.id
        let users = getFileContent();
        if (findUser(id)) {
            const filterUser = {
                users: users.users.filter(user => user.id !== parseInt(id))
            }
            fs.writeFile(__dirname + '/users.json', JSON.stringify(filterUser, null, 2), (err) => {
                if (err) {
                    console.log(`[ERR] ${err}`);
                    res.status(500).json({
                        message: 'Server Responded With Error'
                    })
                }
            });
            res.status(200).json({ message: `user deleted with id ${id}` })
        } else {
            res.status(404).json({
                message: 'User not found'
            })
        }
    } catch (error) {
        console.log(`[Err] ${error}`)
        res.status(500).json({
            message: 'Server Responded With Error'
        })
    }
}


