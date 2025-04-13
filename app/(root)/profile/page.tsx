import { ProfileForm } from "@/components/shared";
import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";

import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getUserSession();
  console.log("str 7 session", session);

  if (!session) {
    return redirect("/not-auth");
  }

  const user = await prisma.user.findFirst({ where: { id: session.user.id } });

  if (!user) {
    return redirect("/not-auth");
  }

  return <ProfileForm data={user} />;
}
