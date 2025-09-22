import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";


const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
    console.log(payload);
    const createPost = await prisma.post.create({
        data: payload,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    isVarified: true,
                    status: true
                }
            }
        }
    });
    return createPost;
};

export const PostServices = {
    createPost
}