const refreshTokensDAO = require("../daos/refreshTokens");

class UsersService{
    async hasToken(token: string): Promise<Boolean>{
        return await refreshTokensDAO.hasToken(token);
    }

    async insertToken(token: string): Promise<void> {
        await refreshTokensDAO.insertToken(token);
    }

    async removeToken(token: string): Promise<void> {
        await refreshTokensDAO.removeToken(token);
    }

    async removeExpiredTokens(): Promise<void> {
        await refreshTokensDAO.removeExpiredTokens();
    }
}

module.exports = new UsersService();
