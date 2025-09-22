import { Router } from "express";
import { PostController } from "./post.controller";

const router = Router();

router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getPostById);

router.post('/', PostController.createPost);
router.patch('/:id', PostController.updatePost);
router.delete('/:id', PostController.deletePost);

export const postRouter = router;