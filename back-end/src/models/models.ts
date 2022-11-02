import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface UserCredentials {
    email: string
    password: string
}

export interface User {
    id: string
    email: string
    password: string
    verified: boolean
    active: boolean
    created: Date
    iat?: Date
}

export interface RequestWithUser extends Request {
    user: string | JwtPayload
}
