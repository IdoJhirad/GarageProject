import {CookieOptions, Request, Response} from "express";
import User, {IUser} from "../db/user.model";
import Garage, { IGarage } from "../db/garage.model"; 
import { sanitizeUser } from "../utiles/sanitizeUser";
import mongoose from "mongoose";

export const getInfo = async (req:Request, res:Response):Promise<void> => {
   try {
    const userID = (<any>req).user._id;
    const userData = (await User.findOne({ _id:userID }))as IUser ;
    if(!userData) {
        res.status(404).json({message: 'User not found'})
        return;
    }
    const userToReturn = sanitizeUser(userData);
    res.status(200).json(userToReturn);           
   } catch (error) {
    res.status(500).json({ message: 'Server error' });
   }
}
export const getGarages = async (req:Request, res:Response):Promise<void> => {
     try {
        const userID = (<any>req).user._id;
        // Populate savedGarages when fetching the user
        const userData = (await User.findById(userID).populate("savedGarages"))as IUser ;
        if(!userData) {
            res.status(404).json({message: 'User not found'})
            return;
        }
        const savedGarages = userData.savedGarages;
        res.status(201).json({ savedGarages });
    }catch (error) {
        console.log('Error fetching garages:', error)
        res.status(500).json({ message: 'Server error' });
    }
}


/** 
 * the post garage do an upsert operation  so if data chenged on the api it will chenge to all user when new user save it 
 */
export const postGarages = async (req:Request, res:Response):Promise<void> => {
    try{
        const userID = (<any>req).user._id;
        const userData = (await User.findOne({ _id:userID }))as IUser ;
        if(!userData) {
            res.status(404).json({message: 'User not found'})
            return;
        }
         // body will be an array of garage objects
        const { garages } = req.body;
        if (!Array.isArray(garages) || garages.length === 0) {
            res.status(400).json({ message: "Invalid garages data" });
            return;
        }
        const savedGaragesIDs = userData.savedGarages;
        for(const garage of garages ) {
            const {_id, mispar_mosah,shem_mosah,cod_sug_mosah,sug_mosah,ktovet,yishuv, telephone,mikud,
                miktzoa,menahel_miktzoa,rasham_havarot} = garage;
                  // Find the garage or create it (upsert)
                  const garageDoc = await Garage.findOneAndUpdate<IGarage>(
                    {_id}, //the critirea
                    {
                    
                        mispar_mosah,
                        shem_mosah,
                        cod_sug_mosah,
                        sug_mosah,
                        ktovet,
                        yishuv,
                        telephone,
                        mikud,
                        miktzoa,
                        menahel_miktzoa,
                        rasham_havarot
                        
                    },
                    {
                        upsert: true,             // Insert if not found
                        new: true,                // Return the updated/newly created document
                        setDefaultsOnInsert: true // Apply defaults if inserting
                    }
                );
                if (!savedGaragesIDs.includes(garageDoc._id)) {
                    savedGaragesIDs.push(garageDoc._id);
                }
            
        } 
        // Update the user's saved garages
        userData.savedGarages = savedGaragesIDs;
        await userData.save();

        res.status(200).json({ message: "Garages saved successfully"});
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            res.status(400).json({ message: `Invalid data: "${error.path}"` })
            
            return;
        }

        if (error instanceof Error) {
            console.error("Error saving garages:", error.message);
        } else {
            console.error("Unexpected error:", error);
        }

        res.status(500).json({ message: "Internal Server Error" });
    }
}