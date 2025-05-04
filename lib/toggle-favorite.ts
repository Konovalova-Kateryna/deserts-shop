export const toggleFavorite = async (
  productId: string,
  isFavorite: boolean
) => {
  if (!productId) {
    console.error("Error:productId is missing");
    return;
  }
  try {
    if (isFavorite) {
      await fetch("/api/favorite", {
        method: "POST",
        body: JSON.stringify({ productId }),
      });
    } else {
      await fetch("/api/favorite", {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  } catch (error) {
    console.log("[TOGGLE_FAVORITE] Server Error", error);
    return { message: "Something went wrong" };
  }
};
