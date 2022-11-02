import { User } from "../models/models";
import { UsersDAO } from "../daos/users";

const usersDao = new UsersDAO();

export class UsersService {
    async createUser(email: string, password: string): Promise<void> {
        await usersDao.createUser(email, password);
    }

    async getUser(email: string): Promise<User> {
        return await usersDao.getUser(email);
    }
}
