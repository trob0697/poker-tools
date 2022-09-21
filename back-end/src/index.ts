import express from 'express';
import dotenv from 'dotenv';

import { router as authRouter } from "./routes/auth/router";

dotenv.config();
const app = express();
const port = 8080;

app.use(express.json());

app.use("/auth", authRouter)

app.listen(port, () => console.log("Server started at http://localhost:" + port));