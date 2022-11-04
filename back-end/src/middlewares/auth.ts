import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { User, RequestWithUser } from "../models/models";

const accessTokenSecret: string = process.env.ACCESS_TOKEN_SECRET ?? "secret";

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    try {
        const authHeader: string | undefined = req.headers.authorization;
        const token: string | null = authHeader !== undefined ? authHeader.split(" ")[1] : null;
        if (token == null) {
            res.sendStatus(401);
            return;
        }
        const user: User = jwt.verify(token, accessTokenSecret) as User;
        delete user.iat;
        (req as RequestWithUser).user = user;
        next();
    } catch (err) {
        res.sendStatus(403);
    }
}
