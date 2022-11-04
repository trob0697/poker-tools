import { Router, Request, Response, RequestHandler } from "express";
import bcrypt from "bcrypt";
import { User, UserCredentials, UserChangeCredentials, RequestWithUser } from "../models/models";
import { UsersService } from "../services/users";

const router: Router = Router();
const userService = new UsersService();

router.put("/email", (async (req: Request, res: Response) => {
    try {
        const user = (req as RequestWithUser).user as User;
        const { email, password }: UserCredentials = req.body;
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).send("Password incorrect");
        }
        await userService.changeEmail(user.id, email);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
}) as RequestHandler);

router.put("/password", (async (req: Request, res: Response) => {
    try {
        const user = (req as RequestWithUser).user as User;
        const { password, newPassword }: UserChangeCredentials = req.body;
        if (!(await bcrypt.compare(password, user.password))) {
            return res.status(400).send("Password incorrect");
        }
        const newHashedPassword: string = await bcrypt.hash(newPassword, 10);
        await userService.changePassword(user.id, newHashedPassword);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
}) as RequestHandler);

router.put("/verify", (async (req: Request, res: Response) => {
    // const user = (req as RequestWithUser).user;
}) as RequestHandler);

router.put("/activate", (async (req: Request, res: Response) => {
    // const user = (req as RequestWithUser).user;
}) as RequestHandler);

export const userRouter: Router = router;
