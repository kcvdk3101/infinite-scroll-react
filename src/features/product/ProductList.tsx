import { FC } from "react";
import { ProductCard } from "../../components/card/ProductCard";
import { ProductModel } from "../../models/product.model";
import NotResultFound from "../../assets/not-result-found.jpg";

interface Props {
  productList: Array<ProductModel>;
  searchText: string;
}

export const ProductList: FC<Props> = ({ productList, searchText }) => {
  return (
    <>
      {productList.length > 0 ? (
        <div className="grid grid-cols-5 gap-4">
          {productList.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      ) : (
        <>
          {searchText !== "" && (
            <div className="w-full min-h-80 flex flex-col justify-center items-center rounded-md bg-white shadow-md">
              <img src={NotResultFound} alt="not-result-found" />
              <div className="text-2xl font-bold">No results found</div>
              <div className="text-base text-gray-500">
                We couldn't find what you're looking for
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
