import express from "express";
import {
  loginUser,
  registerUser,
  loginAdmin,
  verifyEmail,
  resetPassword,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", loginAdmin);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/reset-password", resetPassword);


export default userRouter;
