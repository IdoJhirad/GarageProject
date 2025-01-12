import * as authController from "../../controllers/authControllers"
import express from "express";
import verifyToken from "../../middleware/verifyToken"

// router instance that define routes as middleware handlers for different HTTP requests.
const router = express.Router();
router
    .post("/register",authController.register)
    .post("/login", authController.login)
    .post("/logout", authController.logout)
        //TODO ADD
    //.post("/reset-password", authController.resetPassword)
    //.post("/change-password", verifyToken ,authController.changePassword)
    //.post("/reset-password/confirm", authController.changePasswordResetToken)
    .get("/check-auth", verifyToken, authController.checkAuth);

export default router;