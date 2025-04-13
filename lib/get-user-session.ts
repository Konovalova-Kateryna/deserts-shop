import { auth } from "./auth-options";

export const getUserSession = async () => {
  const session = await auth();

  return session ?? null;
};
