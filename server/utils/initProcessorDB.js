import Processor from "../models/processor.js";
import jsonProcessors from "../data/processors.json"
import mongoose from "mongoose";

const CONNECTION_URL = "mongodb+srv://jlee7772:Leeboxer44!@cluster0.cczj9.mongodb.net/Products?retryWrites=true&w=majority";

mongoose
	.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => Processor.create(jsonProcessors))
	.catch((error) => console.log(`${error} did not connect`));