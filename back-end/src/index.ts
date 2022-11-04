import express, { Application } from "express";
import dotenv from "dotenv";

import { authenticateToken } from "./middlewares/auth";

import { authRouter } from "./routes/auth";
import { equityCalculatorRouter } from "./routes/equityCalculator";
import { userRouter } from "./routes/user";

dotenv.config();

const app: Application = express();
const port: string = process.env.port ?? "4000";

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/equity-calculator", authenticateToken, equityCalculatorRouter);
app.use("/api/user", authenticateToken, userRouter);

app.listen(port, () => console.log("Server started at http://localhost:" + port));
