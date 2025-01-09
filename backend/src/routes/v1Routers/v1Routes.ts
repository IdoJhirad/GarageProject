import AuthRouter from "./AuthRouter"
import GlobalGaragesRouter from "./globalGarageRouter"
import UserRouter from "./userRouter"
import express from "express";
const router = express.Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/global-garages", GlobalGaragesRouter);

export default router;