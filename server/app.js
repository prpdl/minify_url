import express from 'express';
import path from 'path';
import logger from 'morgan';
import cors from 'cors'
import cookieParser from 'cookie-parser'

import usersRouter from './routes/users';
import urlRouter from './routes/url';
import jwt from 'jsonwebtoken';

const app = express();

app.use(cors());
app.use(cookieParser())
app.use(logger(process.env.NODE_ENV === 'development' ? 'dev' : 'short'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    return res.send('Welcome to URL Shorning API')
})

app.get('/verifyToken', ((req, res) => {
    jwt.verify(req.cookies.token, process.env.TOKEN_SECRET, (err)=> {
        if(err){
            res.status(401).json({sucess: false});
        }else{
            res.status(200).json({sucess: true});
        }
    })
}));
app.use('/api/user', usersRouter) // Writing Json File (First Task)
app.use('/api/url', verifyToken, urlRouter);


function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    const cookieToken = req.cookies.token;
    console.log(cookieToken)
    if(cookieToken == null) {
        return res.sendStatus(401)
    }
        // const token = cookieToken.split(' ')[1];
        jwt.verify(cookieToken, process.env.TOKEN_SECRET, (err) => {
            if(err) {
                res.status(403).json(err.message)
            }else{
                req.token = cookieToken;
                next();
            }
        })
    
}

export default app;