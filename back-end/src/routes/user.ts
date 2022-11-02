import { Router, Request, Response, RequestHandler } from "express";
// import { User, RequestWithUser } from "../models/models";

const router: Router = Router();

router.put("/verify", (async (req: Request, res: Response) => {
    // const user = (req as RequestWithUser).user;
}) as RequestHandler);

router.put("/activate", (async (req: Request, res: Response) => {
    // const user = (req as RequestWithUser).user;
}) as RequestHandler);

export const userRouter: Router = router;
