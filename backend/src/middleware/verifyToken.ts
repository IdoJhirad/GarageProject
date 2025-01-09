import User, {IUser} from "../db/user.model";
import {RequestHandler} from 'express';
import jwt, { JwtPayload, TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

/**
* TypeScript interface tell compiler that maybe on the JwtPayload have _id field
* 
*/
interface DecodedToken extends JwtPayload {
    _id?: string;
}

const verifyToken: RequestHandler = async (req, res, next) => {    try {
        //get the token;
        const token = req.cookies.token;
        if (!token) {
             res.status(401).json({ message: "Token missing, please login again" });
             return
        }

        //verify the Token
        //the ! is to tell the compiler is a string
        const decodedInfo = jwt.verify(token, process.env.SECRET_KEY!) as DecodedToken;

        //  If decoded info has `_id`, find that user
        if (decodedInfo && decodedInfo._id) {
            const foundUser = (await User.findOne({ _id: decodedInfo._id }))as IUser
            
            // If foundUser is null, we store undefined:
            (<any>req).user = foundUser ?? undefined;
             next();
             return;
        } else {
             res.status(401).json({ message: "Invalid Token, please login again" });
             return
        }
    } catch (error) {
        // TokenExpiredError / JsonWebTokenError vs. general server error
        if (error instanceof TokenExpiredError) {
            console.log(error);
             res.status(401).json({ message: "Token expired, please login again" });
        } else if (error instanceof JsonWebTokenError) {
            console.log(error);
             res.status(401).json({ message: "Invalid Token, please login again" });
        } else {
            console.log(error);
             res.status(500).json({ message: "Internal Server Error" });
        }
    }
}
export default verifyToken;