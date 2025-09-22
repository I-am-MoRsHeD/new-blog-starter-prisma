import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";


const createPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {
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

const getAllPosts = async () => {
    const allPosts = await prisma.post.findMany({
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
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return allPosts;
};


const getPostById = async (id: number) => {
    const getPost = await prisma.post.findUnique({
        where: {
            id
        },
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

    return getPost;
};

const updatePost = async (id: number, payload: Prisma.PostUpdateInput) => {
    const updatePost = await prisma.post.update({
        where: {
            id
        },
        data: { ...payload }
    });

    return updatePost;
};

const deletePost = async (id: number) => {
    const deletePost = await prisma.post.delete({
        where: {
            id
        }
    });

    return deletePost;
}


export const PostServices = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}