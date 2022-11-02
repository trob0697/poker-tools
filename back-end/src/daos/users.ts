import { db } from "../database/db";
import { User } from "../models/models";

export class UsersDAO {
    async createUser(email: string, password: string): Promise<void> {
        await db("users")
            .insert({
                email,
                password
            });
    }

    async getUser(email: string): Promise<User> {
        const user: User = await db("users").where({ email }).first();
        return user;
    }
};
