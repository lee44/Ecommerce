import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import processorRouter from "./routes/processor.js";

const CONNECTION_URL = "mongodb+srv://jlee7772:Leeboxer44!@cluster0.cczj9.mongodb.net/Products?retryWrites=true&w=majority";
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
