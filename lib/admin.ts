import { auth } from "@clerk/nextjs";

const allowedIds = ["user_2ds6MzxnnAiEleAY5gv6ycKB5sA"];

export const isAdmin = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  return allowedIds.indexOf(userId) !== -1;
};
