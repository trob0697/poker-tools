import { RefreshTokenDAO } from "../daos/refreshTokens";

const refreshTokensDao = new RefreshTokenDAO();

export class RefreshTokenService {
    async hasToken(token: string): Promise<boolean> {
        return await refreshTokensDao.hasToken(token);
    }

    async insertToken(token: string): Promise<void> {
        await refreshTokensDao.insertToken(token);
    }

    async removeToken(token: string): Promise<void> {
        await refreshTokensDao.removeToken(token);
    }

    async removeExpiredTokens(): Promise<void> {
        await refreshTokensDao.removeExpiredTokens();
    }

    async removeAllTokens(): Promise<void> {
        await refreshTokensDao.removeAllTokens();
    }
}
