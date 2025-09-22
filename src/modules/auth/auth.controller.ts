import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./auth.service";


const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await AuthServices.userLogin(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const authWithGoogle = async (req: Request, res: Response) => {
    try {
        const result = await AuthServices.authWithGoogle(req.body)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error)
    }
}

export const AuthController = {
    userLogin,
    authWithGoogle
}