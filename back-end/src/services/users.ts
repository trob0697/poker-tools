const usersDAO = require("../daos/users");
import { User } from "../models/models"

class UsersService{
    async createUser(email: string , password: string): Promise<void>{
        await usersDAO.createUser(email, password);
    }

    async getUser(email: string): Promise<User> {
        return await usersDAO.getUser(email);
    }
}

module.exports = new UsersService();
