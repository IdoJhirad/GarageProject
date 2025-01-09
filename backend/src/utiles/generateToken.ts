import dotenv from 'dotenv';
import jwt, { SignOptions } from 'jsonwebtoken';
import * as process from "node:process";
dotenv.config();


/**
 * Defines the shape of the token payload.
 */
export interface TokenPayload {
    _id: string;
    name: string;
    email: string;
}

/**
 * Generates a JWT token.
 *
 * @param payload - The payload to sign, should conform to TokenPayload.
 * @param passwordReset - Flag to determine the type of token expiration. //TODO
 * @returns A signed JWT token as a string.
 * @throws Will throw an error if required environment variables are missing.
 */

export const generateToken = ( payload: TokenPayload, passwordReset:boolean = false ):string => {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error('SECRET_KEY is not defined in environment variables');
    }
    const expiresIn = passwordReset ? process.env.PASSWORD_RESET_TOKEN_EXPIRATION : process.env.LOGIN_TOKEN_EXPIRATION;
    if (!expiresIn) {
        throw new Error('Token expiration is not defined in environment variables');
    }
    const options: SignOptions = {
        expiresIn: expiresIn,
    }

    return jwt.sign(payload, secretKey, options);
}