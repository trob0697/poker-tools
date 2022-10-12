import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { RequestWithUser } from "../models/models";

const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET || "secret";
const refreshTokenSecret: string = process.env.REFRESH_TOKEN_SECRET || "secret";

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    try{
        const authHeader: string | undefined = req.headers["authorization"];
        const token: string | undefined = authHeader && authHeader.split(" ")[1];
        if(token == null)
            return res.sendStatus(401);
        const user = jwt.verify(token, accessTokenSecret);
        (req as RequestWithUser).user = user;
        next();
    }
    catch(err){
        res.sendStatus(403);
    }
}
