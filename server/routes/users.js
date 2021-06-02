import express from 'express'

import {addUser, loginUser} from '../controller/users'

// router.get('/', getUsers);
// router.get('/:id', getUsers);
// router.post('/', validate('addUser'), addUser);
// router.patch('/:id', updateUser);
// router.delete('/:id', deleteUser);


const router = express.Router();

router.post('/login', loginUser)
router.post('/register', addUser)

export default router;