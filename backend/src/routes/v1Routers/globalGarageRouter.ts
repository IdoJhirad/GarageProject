import * as GarageController from "../../controllers/garages.controller"
import verifyToken from "../../middleware/verifyToken"
import express from "express";
const router = express.Router();

router.use(verifyToken);
router
    .get("/",GarageController.getAPIGarages)
export default router;
