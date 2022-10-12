require("dotenv").config()
import express, { Application } from "express";

import { equityCalculatorRouter } from "./routes/equityCalculator";
import { userRouter } from "./routes/user";
import { authRouter } from "./routes/auth";

import  { authenticateToken } from "./middlewares/auth";

const app: Application = express();
const port: String = process.env.port || "4000";

app.use(express.json());
app.use("/api/equity-calculator", authenticateToken, equityCalculatorRouter);
app.use("/api/user", authenticateToken, userRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => console.log("Server started at http://localhost:" + port));