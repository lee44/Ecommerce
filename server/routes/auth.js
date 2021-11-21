import express from "express";
import { forgotPassword, login, register, resetPassword } from "../controllers/auth/auth.js";
import { accessToken, refreshToken } from "../controllers/token/token.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
router.post("/accesstoken", accessToken);
router.post("/refreshtoken", refreshToken);

export default router;
