
export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="h-full w-full px-7 py-5 lg:py-20 lg:px-12 bg-gray-100 animate-pulse grid grid-rows-[auto_1fr_auto] grid-cols-2 gap-8">
      {/* Image placeholder */}
      <div className="col-span-2 flex justify-center">
        <div className="w-[206px] h-[206px] lg:w-[320px] lg:h-[320px] bg-gray-200 rounded" />
      </div>
      {/* Title placeholder */}
      <div className="col-span-2 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-5 bg-gray-200 rounded w-1/2" />
      </div>
      {/* Price + buttons placeholder */}
      <div className="h-8 bg-gray-200 rounded w-24" />
      <div className="h-10 w-10 bg-gray-200 rounded ml-auto" />
    </div>
  );
};


export const ProductsGridSkeleton: React.FC<{ count?: number }> = ({
  count = 3,
}) => {
  return (
    <div className="w-full grid gap-6 my-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="max-w-[530px]">
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
};
