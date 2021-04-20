import express from 'express';
import {createUser} from '../controller/user'
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', createUser);

export default router;
