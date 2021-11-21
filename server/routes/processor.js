import express from "express";
import { getProcessor, getProcessorQuery } from "../controllers/product/getProcessor.js";

const router = express.Router();

router.get("/", getProcessor);
router.get("/query", getProcessorQuery);

export default router;
