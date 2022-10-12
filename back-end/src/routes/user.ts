import { Router, Request, Response } from "express";
import { User, RequestWithUser } from "../models/models";

const router: Router = Router();

router.put("/verify", async (req: Request, res: Response) => {
    const user = (req as RequestWithUser).user;
})

router.put("/activate", async (req: Request, res: Response) => {
    const user = (req as RequestWithUser).user;
})

router.get("/test", async (req: Request, res: Response) => {
    const user = (req as RequestWithUser).user;
    res.status(200).send();
})

export const userRouter: Router = router;
