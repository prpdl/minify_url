import express from 'express'
import {validate, getUsers, addUser, deleteUser, updateUser} from '../controller/users.js'

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUsers);
router.post('/', validate('addUser'), addUser);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;