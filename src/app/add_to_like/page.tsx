"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../_Components/navbar";
import { toast } from "react-toastify";

interface ProductType {
  id: string;
  name: string;
  desc: string;
  price: number;
  category_id: string;
  active: boolean;
  images: string[];
}

export default function Page() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const ticketData = localStorage.getItem("likes");
    if (ticketData) {
      setProducts(JSON.parse(ticketData));
    }
  }, []);

  const addToCart = (product: ProductType) => {
    const existingCart = localStorage.getItem("cart");
    let cartItems: ProductType[] = existingCart ? JSON.parse(existingCart) : [];

    if (!cartItems.some((item) => item.id === product.id)) {
      cartItems.push(product);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      toast.success("Mahsulot savatchaga qo‘shildi!");
    } else {
      toast.info("Bu mahsulot allaqachon savatchada!");
    }
  };

  const toggleLike = (product: ProductType) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("Iltimos, ro‘yxatdan o‘ting!");
      return;
    }

    const existingLikes = localStorage.getItem("likes");
    let likedItems: ProductType[] = existingLikes
      ? JSON.parse(existingLikes)
      : [];

    if (likedItems.some((item) => item.id === product.id)) {
      likedItems = likedItems.filter((item) => item.id !== product.id);
      toast.info("Mahsulot yoqtirishdan olib tashlandi!");
    } else {
      likedItems.push(product);
      toast.success("Mahsulot yoqtirildi!");
    }

    localStorage.setItem("likes", JSON.stringify(likedItems));
  };

  return (
    <div className="max-w-[1500px] mx-auto">
      <Navbar />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
        {products.length === 0
          ? [...Array(10)].map((_, index) => (
              <div key={index} className="border p-4 rounded shadow-sm">
                <div className="w-full h-48 bg-gray-200 animate-pulse mb-4 rounded-lg"></div>
                <div className="w-4/5 h-5 bg-gray-200 animate-pulse mb-2 rounded"></div>
                <div className="w-3/5 h-5 bg-gray-200 animate-pulse mb-4 rounded"></div>
                <div className="flex justify-end items-center mt-4 gap-3">
                  <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
                  <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
                </div>
              </div>
            ))
          : products.map((product) => (
              <div
                key={product.id}
                className="cursor-pointer border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {product.images && product.images.length > 0 ? (
                  <img
                    onClick={() =>
                      (location.href = `/productsInfo/${product.id}`)
                    }
                    src={`https://dijgblooocqejrsjbsto.supabase.co/storage/v1/object/public/${product.images[0]}`}
                    alt={product.name}
                    className="w-full h-72 rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-72 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg mb-4">
                    Rasmlar mavjud emas
                  </div>
                )}
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-green-500 font-bold">{product.price} so‘m</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => toggleLike(product)}
                    className="text-gray-500 hover:text-red-500 text-xl"
                  >
                    ❤️
                  </button>
                  <button
                    onClick={() => addToCart(product)}
                    className="text-gray-500 hover:text-red-500 text-xl"
                  >
                    🛒
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
