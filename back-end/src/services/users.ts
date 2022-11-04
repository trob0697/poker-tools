import { UsersDAO } from "../daos/users";
import { User } from "../models/models";

const usersDao = new UsersDAO();

export class UsersService {
    async createUser(email: string, password: string): Promise<void> {
        await usersDao.createUser(email, password);
    }

    async getUser(email: string): Promise<User> {
        return await usersDao.getUser(email);
    }

    async changeEmail(id: string, newEmail: string): Promise<void> {
        return await usersDao.changeEmail(id, newEmail);
    }

    async changePassword(id: string, newPassword: string): Promise<void> {
        return await usersDao.changePassword(id, newPassword);
    }
}
