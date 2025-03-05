import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const secret_key = process.env.JWT_SECRET;
console.log(secret_key);

const VerifyToken  = (req, res, next) => {
    const token = req.headers["authorization"]

    if (!token) {
        return res.sendStatus(400).status({message: "Token is misiing"})
    }
    jwt.verify(token,secret_key,(err,decode) => {
        if(err) {
            return res.statusStatus(400).send({message: "Invalid Token"})
        }
        req.user = decode
        console.log("decode", decode)
        next()
    })
}

export default VerifyToken