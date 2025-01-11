import {CookieOptions, Request, Response} from "express";
import mongoose from "mongoose";
import User, {IUser} from "../db/user.model";
import {generateToken} from "../utiles/generateToken";
import { sanitizeUser, SanitizedUser } from "../utiles/sanitizeUser";

/**
 * Register a new user
 * @param req Request object
 * @param res Response object
 * @returns void (but sends a JSON response)
 */
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, name } = req.body;

        // 1) Check if required fields are present
        if (!email || !password || !name) {
            res.status(400).json({ message: "Missing required field" });
            return;
        }

        // 2) Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("User already exists");
            res.status(400).json({ message: "Email already exists" });
            return;
        }

        // 3) Create new user, but first hash the password
        const userInstance = new User({ name, email });

        // Use the schema's encryptPassword method to hash
        userInstance.password = await userInstance.encryptPassword(password);

        // 4) Save the new user
        const newUser = await userInstance.save();

        if (newUser) {
            res.status(201).json({ message: "User registered successfully" });
            return;
        }
    } catch (error) {
        // Check if error is from a duplicate key
        if (
            error instanceof mongoose.Error &&
            error.name === "MongoServerError" &&
            (error as any).code === 11000
        ) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }
        console.error(error);
        res.status(500).json({ message: "Fail to create account." });
    }
};

/**
 * Login a user
 */

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // find the user and cast to IUser
        const userData = (await User.findOne({ email }))as IUser ;
        if (!userData) {
             res.status(404).json({ message: "User not found" });
             return;
        }
        const isValid = await userData.validPassword(password);
        if (!isValid) {
            res.status(401).json({ message: "Authentication failed" });
            return;
        }

        // 3) Sanitize user data
        const sanitizedUser: SanitizedUser = sanitizeUser(userData);

        // 4) Generate JWT token
        const token = generateToken(sanitizedUser);

        const cookieOptions: CookieOptions = {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            sameSite: 'lax', // Helps protect against CSRF attacks
            maxAge: 3600000, // 1 hour in milliseconds
        };
        //attache the cookie
        res.cookie('token', token, cookieOptions);
        res.status(200).json({ message: "Logged in successfully",user:sanitizedUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({message:"OK"});

}

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({message:"OK"});

}

export const changePassword = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({message:"OK"});

}

export const changePasswordResetToken = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({message:"OK"});

}

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json({message:'User is logged in'});

}