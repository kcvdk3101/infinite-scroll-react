import { FC } from "react";
import { ProductModel } from "../../models/product.model";
import { StarIcon } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

interface Props {
  product: ProductModel;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const originalPrice = Math.round(product.price / (1 - product.discountPercentage / 100));

  return (
    <div
      className={`relative flex flex-col items-stretch justify-center rounded-xl p-4 backdrop-blur-sm shadow-xl border border-gray-50 ${
        product.stock === 0 && "bg-gray-100 text-gray-400"
      }`}
    >
      <Swiper
        cssMode
        navigation
        modules={[Navigation]}
        loop
        className="h-40 w-full product-image-swiper"
      >
        {product.images.map((img, idx) => (
          <SwiperSlide>
            <img
              className={`cursor-pointer object-contain h-40 w-full ${
                product.stock === 0 ? "blur-[1px]" : "blur-none"
              }`}
              src={img}
              alt={`${product.brand}_${product.title}_${product.id}_${idx}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex-1">
        <div className="text-xl font-bold mt-2">{product.title}</div>
        <div className="flex flex-row align-center text-yellow-400 mt-1">
          {Array.from({ length: Math.ceil(product.rating) }).map((_, idx) => (
            <StarIcon key={idx} width={14} height={14} />
          ))}
        </div>
        <div className="mt-2 text-2xl font-bold text-blue-400">${product.price}</div>
      </div>
      <div className="mt-2 flex flex-row items-center gap-2">
        <div className="text-base text-gray-300 line-through">${originalPrice}</div>
        <p className="text-xs px-1 py-0.5 text-red-400 bg-red-200 no-underline rounded">
          {product.discountPercentage}% off
        </p>
      </div>
      {product.stock === 0 ? (
        <div className="absolute top-0 right-0 px-3 py-2 bg-gray-500 text-white rounded-xl">
          Out of stock
        </div>
      ) : null}
    </div>
  );
};
