import * as UserController from "../../controllers/user.controller"
import verifyToken from "../../middleware/verifyToken"
import express from "express";
const router = express.Router();

router.use(verifyToken);
router
    .get("/info",UserController.getInfo)
    .get("/garages",UserController.getGarages )
    .post("/garages", UserController.postGarages)
export default router;
