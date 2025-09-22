import { NextFunction, Request, Response } from "express";
import { UserSerivces } from "./user.service";


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await UserSerivces.createUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await UserSerivces.getAllUsers();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await UserSerivces.getUserById(Number(req.params.id));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const UserController = {
    createUser,
    getAllUsers,
    getUserById
};