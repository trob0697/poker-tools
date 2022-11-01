import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type UserCredentials = {
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
    iat?: Date;
}

export interface RequestWithUser extends Request {
    user: string | JwtPayload;
}