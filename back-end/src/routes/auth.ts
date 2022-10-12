import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User, UserRegiLogin } from "../models/models";

const router: Router = Router();
const userService = require("../services/users");
const refreshTokenService = require("../services/refreshTokens");

const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET || "secret";
const refreshTokenSecret: string = process.env.REFRESH_TOKEN_SECRET || "secret";

let refreshTokens: any[] = [];

router.post("/register", async (req: Request, res: Response) => {
    try{
        const { email, password }: UserRegiLogin = req.body;
        // check for valid email
        const hashedPassword = await bcrypt.hash(password, 10);
        await userService.createUser(email, hashedPassword);
        res.status(201).send();
    }
    catch(err: any){
        if(err.code == 23505)
            res.status(409).send("Account already exists");
        res.status(500).send(err);
    }
})

router.post("/login", async (req: Request, res: Response) => {
    try{
        const { email, password }: UserRegiLogin = req.body;
        const user: User = await userService.getUser(email);
        if(user == null) 
            return res.status(400).send("Login failed");
        if(!(await bcrypt.compare(password, user.password)))
            return res.status(400).send("Login failed");
        const accessToken: string = jwt.sign(user, accessTokenSecret, { expiresIn: 1200 });
        const refreshToken: string = jwt.sign(user, refreshTokenSecret, { expiresIn: "7d"});
        await refreshTokenService.insertToken(refreshToken);
        res.status(200).send({
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }
    catch(err){
        return res.status(500).send(err);
    }
})

router.post("/token", async (req: Request, res: Response) => {
    try{
        const refreshToken = req.body.refreshToken;
        if(refreshToken == null) 
            return res.status(401).send();
        if(!(await refreshTokenService.hasToken(refreshToken)))
            return res.status(403).send();
        const user = jwt.verify(refreshToken, refreshTokenSecret);
        // remove iat from user object
        const accessToken = jwt.sign(user, accessTokenSecret, { expiresIn: 1200 });
        res.status(200).json({"accessToken": accessToken});
    }
    catch(err){
        res.status(500).send(err);
    }
})

router.delete("/logout", async (req: Request, res: Response) => {
    try{
        const refreshToken = req.body.refreshToken;
        await refreshTokenService.removeToken(refreshToken);
        refreshTokens = refreshTokens.filter( token => token !== refreshToken);
        res.status(204).send();
    }
    catch(err){
        res.status(500).send();
    }
})

router.delete("/remove-expired-tokens", async (req: Request, res: Response) => {
    try{
        await refreshTokenService.removeExpiredTokens();
        res.status(204).send();
    }
    catch(err){
        res.status(500).send();
    }
})

export const authRouter: Router = router;
