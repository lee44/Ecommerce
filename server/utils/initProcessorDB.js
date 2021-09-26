import Processor from "../models/processor.js";
import jsonProcessors from "../data/processors.json";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const CONNECTION_URL = process.env.MONGO_URI;
mongoose
	.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => Processor.create(jsonProcessors))
	.catch((error) => console.log(`${error} did not connect`));
