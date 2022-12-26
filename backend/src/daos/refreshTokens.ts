import { db } from "../database/db";

export class RefreshTokenDAO {
    async hasToken(token: string): Promise<boolean> {
        const existingTokens = await db("refresh_tokens")
            .where({ token });
        return existingTokens != null;
    }

    async insertToken(token: string): Promise<void> {
        const today = new Date();
        const expiry = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 8);
        await db("refresh_tokens")
            .insert({
                token,
                expiry
            });
    }

    async removeToken(token: string): Promise<void> {
        await db("refresh_tokens")
            .where({ token })
            .del();
    }

    async removeExpiredTokens(): Promise<void> {
        await db("refresh_tokens")
            .where("expiry", "<", new Date())
            .del();
    }

    async removeAllTokens(): Promise<void> {
        await db("refresh_tokens")
            .del();
    }
}
