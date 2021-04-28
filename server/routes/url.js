import express from 'express'
import {getUrl, postUrl, redirectUrl} from '../controller/url'

const router = express.Router();

router.get('/', getUrl)
router.get('/:shortId', redirectUrl)
router.post('/', postUrl)

export default router;
