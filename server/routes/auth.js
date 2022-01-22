import express from "express";
import passport from "passport";
import { login, logout, refreshToken, register } from "../controllers/auth/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/logout", passport.authenticate("jwt", { session: false }), logout);
router.post("/refreshToken", refreshToken);

export default router;
