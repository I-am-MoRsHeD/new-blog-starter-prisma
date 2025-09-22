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

    return await prisma.$transaction(async (tx) => {
        await tx.post.update({
            where: {
                id
            },
            data: {
                views: {
                    increment: 1
                }
            }
        })
        return await tx.post.findUnique({
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
    })
};

const getBlogStats = async () => {
    return await prisma.$transaction(async (tx) => {
        const aggregates = await tx.post.aggregate({
            _count: true,
            _sum: { views: true },
            _avg: { views: true },
            _max: { views: true },
            _min: { views: true },
        });

        const featuredCount = await tx.post.count({
            where: {
                isFeatured: true
            }
        });

        const topFeatured = await tx.post.findFirst({
            where: { isFeatured: true },
            orderBy: { views: "desc" }
        });

        let lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        const lastWeekPostCount = await tx.post.count({
            where: {
                createdAt: {
                    gte: lastWeek
                }
            }
        })

        return {
            stats: {
                totalPosts: aggregates._count ?? 0,
                totalViews: aggregates._sum.views ?? 0,
                avgViews: aggregates._avg.views ?? 0,
                minViews: aggregates._min.views ?? 0,
                maxViews: aggregates._max.views ?? 0
            },
            featured: {
                count: featuredCount,
                topPost: topFeatured,
            },
            lastWeekPostCount
        }
    });
}

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
    getBlogStats,
    updatePost,
    deletePost
}