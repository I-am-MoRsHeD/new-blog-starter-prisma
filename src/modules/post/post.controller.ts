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

const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await PostServices.getAllPosts();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await PostServices.getPostById(Number(req.params.id));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await PostServices.updatePost(Number(req.params.id), req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await PostServices.deletePost(Number(req.params.id));
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};


export const PostController = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};