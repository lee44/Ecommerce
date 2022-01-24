import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import { passportJWTConfig } from "./passport/jwtStrategy.js";
import { passportLocalConfig } from "./passport/localStrategy.js";
import authRouter from "./routes/auth.js";
import privateRouter from "./routes/private.js";
import processorRouter from "./routes/processor.js";

dotenv.config();

const CONNECTION_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
const corsOptions = {
	//To allow requests from client
	origin: ["http://localhost:3000"],
	credentials: true,
	exposedHeaders: ["set-cookie"],
};
app.use(cors(corsOptions));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/processors", processorRouter);
app.use("/api/auth", authRouter);
app.use("/api/private", privateRouter);

passportLocalConfig(passport);
passportJWTConfig(passport);
app.use(passport.initialize());

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
