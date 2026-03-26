import { getUserSession } from "@/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getUserSession();
  if (!session) {
    return redirect("/not-auth");
  }

  const isAdmin = await prisma.user.findFirst({
    where: { id: session.user.id, role: "ADMIN" },
  });

  return isAdmin ? (
    <div>
      <h1>Admin Page</h1>
      <p>Welcome, Admin!</p>
      <p>{isAdmin.fullName}</p>
    </div>
  ) : (
    redirect("/not-auth")
  );
}
