import { FC, useEffect, useState } from "react";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

export const BackToTop: FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isTop = currentScrollY < 400;
      setIsVisible(!isTop);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`${
        isVisible ? "opacity-100" : "opacity-0"
      } fixed bottom-8 right-4 transition-opacity duration-300 ease-in-out bg-blue-500 text-white p-2 rounded-full shadow-lg`}
    >
      <ArrowUpIcon width={24} height={24} />
    </button>
  );
};
