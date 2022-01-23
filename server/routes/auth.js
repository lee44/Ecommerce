import express from "express";
import passport from "passport";
import { forgotPassword, login, logout, refreshToken, register, resetPassword } from "../controllers/auth/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
/* 
  For passport.authenticate, there are two ways:
  1) Use it as middleware like below
  2) Define a custom callback in the route controller like above

  As middleware, very easy and fast but you can't customize success or error messages

  As custom callback, harder to implement and need to establish a session by calling req.login() or req.logout()
*/
router.get("/logout", passport.authenticate("jwt", { session: false }), logout);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);

router.post("/refreshToken", refreshToken);

export default router;
