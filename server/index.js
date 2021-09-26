import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import processorRouter from "./routes/processor.js";
import dotenv from "dotenv";

dotenv.config();

const CONNECTION_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use("/api/processors", processorRouter);
// app.use("/api/motherboard", motherboardRouter);
// app.use("/api/case", caseRouter);
// app.use("/api/storage", storageRouter);
// app.use("/api/powersupply", powersupplyRouter);
// app.use("/api/opticaldrive", opticaldriveRouter);
// app.use("/api/memory", memoryRouter);
// app.use("/api/cooling", coolingRouter);

mongoose
	.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
	.catch((error) => console.log(`${error} did not connect`));
