import { Container, TitleComponent } from "@/components/shared";
import { FavoriteProducts } from "@/components/shared/favorite-products";

import { getUserSession } from "@/lib/get-user-session";
import { redirect } from "next/navigation";

export default async function FavoritePage() {
  const session = await getUserSession();
  if (!session) {
    return redirect("/not-auth");
  }
  return (
    <div className="border-t-2 border-black">
      <Container>
        <TitleComponent className=" mb-3 lg:mb-1">
          Улюблені товари
        </TitleComponent>
        <FavoriteProducts />
      </Container>
    </div>
  );
}
