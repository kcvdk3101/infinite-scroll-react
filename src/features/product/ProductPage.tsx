import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { AxiosError } from "axios";
import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from "react";
import { productApi } from "../../api/product.api";
import { BackToTop } from "../../components/button/BackToTop";
import { useDebounce } from "../../hooks/useDebounce";
import { ProductModel } from "../../models/product.model";
import { ProductList } from "./ProductList";
import "./product.module.css";

export const ProductPage: FC = () => {
  const loader = useRef(null);
  const hasMore = useRef(false);

  const [skip, setSkip] = useState(0);
  const [limit] = useState(20);
  const [productList, setProductList] = useState<Array<ProductModel>>([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");

  const handleChangeSearchText = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    hasMore.current = false;
    setSearchText(e.target.value);
    setSkip(0);
    setTotalProduct(0);
  }, 500);

  const getProductList = useCallback(async () => {
    if (skip > totalProduct) return;
    setLoading(true);
    return await productApi
      .getProductListWithSearch({ skip, limit, searchText })
      .then((response) => {
        console.log(response.total);
        hasMore.current = response.products.length > 0;
        setProductList((prev) =>
          skip === 0 ? response.products : [...prev, ...response.products],
        );
        setTotalProduct(response.total);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [skip, searchText]);

  const handleObserver = useCallback((entries: Array<IntersectionObserverEntry>) => {
    if (!hasMore.current) return;
    const target = entries[0];
    if (target.isIntersecting) {
      setSkip((prev) => prev + limit);
    }
  }, []);

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl py-5 mx-auto">
        <div className="flex flex-row items-stretch p-3 shadow-md rounded-lg max-w-fit mb-4">
          <input
            type="text"
            className="flex-1 px-2 py-1 text-gray-900 focus:outline-none "
            placeholder="Search product by name"
            onChange={handleChangeSearchText}
          />
          <button className="shrink-0 px-4 bg-white rounded-tr-lg rounded-br-lg text-gray-900">
            <MagnifyingGlassIcon width={16} height={16} />
          </button>
        </div>
        <ProductList productList={productList} searchText={searchText} />
        {loading && (
          <div className="loader p-5 width-full my-3 flex flex-row justify-center gap-2">
            <div className="w-3 h-3 bg-gray-700 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gray-700 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-gray-700 rounded-full animate-bounce"></div>
          </div>
        )}
        <div ref={loader} />
        <BackToTop />
      </div>
    </div>
  );
};
