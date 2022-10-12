import { db } from "../database/db";

class UsersDAO {
    async hasToken(token: string): Promise<Boolean> {
        const existingTokens = await db("refresh_tokens")
            .where({token: token})
        return existingTokens != null
    }

    async insertToken(token: string): Promise<void> {
        const today = new Date;
        const expiry = new Date(today.getFullYear(), today.getMonth(), today.getDate()+8);
        await db("refresh_tokens")
            .insert({
                token: token,
                expiry: expiry
            });
    }

    async removeToken(token: string): Promise<void> {
        await db("refresh_tokens")
            .where({token: token})
            .del();
    }

    async removeExpiredTokens(): Promise<void> {
        await db("refresh_tokens")
            .where("expiry", "<", new Date)
            .del();
    }
}

module.exports = new UsersDAO();