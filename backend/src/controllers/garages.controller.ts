import {CookieOptions, Request, Response} from "express";
import Garage, { IGarage } from "../db/garage.model"; 
import axios from "axios";

/**
 * need to get quary in the url or defult 20
*/

//TODO module jeneric
export const getAPIGarages = async (req:Request, res:Response):Promise<void> => {
    try {
        //TODO put in the env file 
        const limit = parseInt(req.query.limit as string) || 20;

        const responed = await axios.get<IGarage[]>(`https://data.gov.il/api/3/action/datastore_search?resource_id=bb68386a-a331-4bbc-b668-bba2766d517d&limit=${limit}`);

        res.status(200).json(responed.data);
    } catch (error:any){
        if(error.response) {
            console.error("External API error:", {
                status: error.response.status,
                data: error.response.data,
              });
              res.status(error.response.status).json({
                message: "External API error"});

        } else if (error.request) {
            // No response received (network or external server issue)
            console.error("No response from external API:", error.request);
      
            res.status(503).json({
              message: "Service unavailable. Unable to contact external API.",
            });
          } else {
            // Internal server error (code or runtime issue)
            console.error("Internal server error:", error.message);
      
            res.status(500).json({
              message: "Internal server error",
            });
          }

    }
}


