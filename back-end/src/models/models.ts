import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type UserRegiLogin = {
    email: string;
    password: string;
}

export type User = {
    id: string;
    email: string;
    password: string;
    verified: boolean;
    active: boolean;
    created: Date;
}

export interface RequestWithUser extends Request {
    user: string | JwtPayload;
}