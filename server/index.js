import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import passportConfig from "./config/passport.js";
import authRouter from "./routes/auth.js";
import processorRouter from "./routes/processor.js";

dotenv.config();

const CONNECTION_URL = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.set("trust proxy", 1);
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: true, // don't create session until something stored
		resave: false, //don't save session if unmodified
		store: MongoStore.create({
			mongoUrl: CONNECTION_URL,
			touchAfter: 24 * 3600, //session can only be saved once every 24 hrs
		}),
		cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 },
	})
);

passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/processors", processorRouter);
app.use("/api/auth", authRouter);
app.use(cookieParser);

mongoose
	.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
	.catch((error) => console.log(`${error} did not connect`));
