import { NextFunction, Request, Response } from "express";
import { PostServices } from "./post.service";



const createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await PostServices.createPost(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const PostController = {
    createPost
};