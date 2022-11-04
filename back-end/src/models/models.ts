import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface User {
    id: string
    email: string
    password: string
    verified: boolean
    active: boolean
    created: Date
    iat?: Date
}

export interface UserCredentials {
    email: string
    password: string
}

export interface UserChangeCredentials {
    password: string
    newPassword: string
}

export interface RequestWithUser extends Request {
    user: User | JwtPayload
}
