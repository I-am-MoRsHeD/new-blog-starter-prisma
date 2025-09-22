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

const getAllPosts = async (query: Record<string, string>) => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = (query.search as string) || "";
    const isFeatured = query.isFeatured ? query.isFeatured === 'true' : undefined;
    const tags = query.tags ? query.tags.split(",") : [];

    const where: any = {
        AND: [
            search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { contains: search, mode: 'insensitive' } }
                ],
            },
            typeof isFeatured === 'boolean' && { isFeatured },
            (tags && tags.length > 0) && { tags: { hasEvery: tags } }
        ].filter(Boolean) // boolean data handle er ketre eita bolte hoise and jehetu multiple logic/filter handle hocce
    };

    const allPosts = await prisma.post.findMany({
        skip,
        take: limit,
        where,
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

    const total = await prisma.post.count({ where });

    return {
        data: allPosts,
        pagination: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit)
        }
    };
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