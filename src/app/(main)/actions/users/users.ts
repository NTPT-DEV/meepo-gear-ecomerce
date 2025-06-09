import { prisma } from "@/lib/prisma";

// Get all user
export const getAllusers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        statusUser: true,
        address: true,
        createAt: true,
        updateAt: true,
        phone: true,
        orders: true,
        carts: true,
      },
    });
    return users;
  } catch (error) {
    console.log(error);
  }
};

// Change Status User
export const changeStatus = async (id: string, statusUser: boolean) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        statusUser: statusUser,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

// Change Role user
export const changeRole = async (id: string, role: string) => {
  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        role: role,
      },
    });
    return user
  } catch (error) {
    console.log(error);
  }
};
