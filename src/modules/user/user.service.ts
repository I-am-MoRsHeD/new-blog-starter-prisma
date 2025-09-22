import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";


const createUser = async (payload: Prisma.UserCreateInput): Promise<User> => {
    const createUser = await prisma.user.create({
        data: payload
    });
    return createUser;
};

const getAllUsers = async () => {
    const allUsers = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phone: true,
            picturer: true,
            status: true,
            isVarified: true,
            createdAt: true,
            updateAt: true,
            posts: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return allUsers;
};


const getUserById = async (id: number) => {
    const getUser = await prisma.user.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phone: true,
            picturer: true,
            status: true,
            isVarified: true,
            createdAt: true,
            updateAt: true,
            posts: true
        }
    });

    return getUser;
};

export const UserSerivces = {
    createUser,
    getAllUsers,
    getUserById
};