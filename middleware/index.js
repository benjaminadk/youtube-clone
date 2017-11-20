import jwt from 'jsonwebtoken';
const keys = require("../config/keys");

export const checkAuthHeaders = (req, res, next) => {
    const TOKEN = req.headers.authorization
    jwt.verify(TOKEN, keys.jwtSecret, (err, user) => {
        if(err){
            throw new Error(err.message)
        }
        if(user){
            req.user = user
        }
    })
    next()
}