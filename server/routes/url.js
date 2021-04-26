import express from 'express'
import {getUrl, postUrl, redirectUrl} from '../controller/url'
import 'core-js/features/promise'
import 'regenerator-runtime/runtime'

const router = express.Router();

router.get('/', getUrl)
router.get('/:shortId', redirectUrl)
router.post('/', postUrl)
export default router;
