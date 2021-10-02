import dotenv from "dotenv";
import mongoose from "mongoose";
import { processorData } from "../data/processors.js";
import Processor from "../models/processor.js";

dotenv.config();

const CONNECTION_URL = "mongodb+srv://jlee7772:Leeboxer44!@cluster0.cczj9.mongodb.net/Products?retryWrites=true&w=majority";
mongoose
	.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => Processor.create(processorData))
	.catch((error) => console.log(`${error} did not connect`));
