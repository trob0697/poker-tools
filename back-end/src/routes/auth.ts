import { Router, Request, Response, RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User, UserCredentials } from "../models/models";
import { UsersService } from "../services/users";
import { RefreshTokenService } from "../services/refreshTokens";

const router: Router = Router();
const userService = new UsersService();
const refreshTokenService = new RefreshTokenService();
const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET ?? "secret";
const refreshTokenSecret: string = process.env.REFRESH_TOKEN_SECRET ?? "secret";

router.post("/register", (async (req: Request, res: Response) => {
    try {
        const { email, password }: UserCredentials = req.body;
        const hashedPassword: string = await bcrypt.hash(password, 10);
        await userService.createUser(email, hashedPassword);
        return res.status(201).send();
    } catch (err: any) {
        if (err.code === 23505) { res.status(409).send("Account already exists"); }
        return res.status(500).send(err);
    }
}) as RequestHandler);

router.post("/login", (async (req: Request, res: Response) => {
    try {
        const { email, password }: UserCredentials = req.body;
        const user: User = await userService.getUser(email);
        if (user == null) { return res.status(400).send("Login failed"); }
        if (!(await bcrypt.compare(password, user.password))) { return res.status(400).send("Login failed"); }
        const accessToken: string = jwt.sign(user, accessTokenSecret, { expiresIn: 1200 });
        const refreshToken: string = jwt.sign(user, refreshTokenSecret, { expiresIn: "7d" });
        await refreshTokenService.insertToken(refreshToken);
        res.status(200).send({
            accessToken,
            refreshToken
        });
    } catch (err) {
        return res.status(500).send(err);
    }
}) as RequestHandler);

router.post("/token", (async (req: Request, res: Response) => {
    try {
        const refreshToken: string = req.body.refreshToken;
        if (refreshToken == null) { return res.status(401).send(); }
        if (!(await refreshTokenService.hasToken(refreshToken))) { return res.status(403).send(); }
        const user: User = jwt.verify(refreshToken, refreshTokenSecret) as User;
        delete user.iat;
        const accessToken: string = jwt.sign(user, accessTokenSecret, { expiresIn: 1200 }); // TODO: expresIn not working
        res.status(200).json({ accessToken });
    } catch (err) {
        res.status(500).send(err);
    }
}) as RequestHandler);

router.delete("/logout", (async (req: Request, res: Response) => {
    try {
        const refreshToken: string = req.body.refreshToken;
        await refreshTokenService.removeToken(refreshToken);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
}) as RequestHandler);

router.delete("/tokens", (async (req: Request, res: Response) => {
    try {
        await refreshTokenService.removeExpiredTokens();
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
}) as RequestHandler);

export const authRouter: Router = router;
