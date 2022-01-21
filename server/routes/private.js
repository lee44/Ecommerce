import express from "express";
import passport from "passport";
import { getPrivateRoute } from "../controllers/private.js";

const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false }), getPrivateRoute);

export default router;
