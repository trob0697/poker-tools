import { db } from "../database/db";
import { User } from "../models/models"

class UsersDAO {
    async createUser(email: string, password: string): Promise<void> {
        await db("users")
            .insert({
                email: email,
                password: password
            });
    }

    async getUser(email: string): Promise<User>{
        const user: User = await db("users").where({email: email}).first();
        return user;
    }
}

module.exports = new UsersDAO();