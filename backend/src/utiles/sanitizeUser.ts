import {IUser} from "../db/user.model";

/**
 * Defines the shape of the sanitized user object.
 */

export interface SanitizedUser{
    _id: string;
    name: string;
    email: string;
}
/**
* Sanitizes a user object by selecting specific fields.
*
* @param user - The user object to sanitize.
* @returns A sanitized user object.
*/

export const sanitizeUser = (user:IUser): SanitizedUser => {
    return{
        _id: user._id.toString(),
        name: user.name,
        email: user.email
    }
}