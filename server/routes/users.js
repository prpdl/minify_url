import express from 'express';
import {createUser, getUsers, testCase} from '../controller/user'
const router = express.Router();


/* GET users listing. */
router.get('/', getUsers)

router.get('/:id', getUsers)

router.post('/', createUser);

export default router;
