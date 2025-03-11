"use client";
import { createClient } from "@/supabase/client";
import React, { useEffect, useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RangeSlider from "react-range-slider-input";
import Image from "next/image";

interface ProductType {
  id: string;
  name: string;
  desc: string;
  price: number;
  category_id: string;
  active: boolean;
  images: string[];
}

interface CategoryType {
  id: string;
  name: string;
  active: boolean;
}

function HomeProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productsLeng, setProductsLeng] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    let query = supabase.from("Shop_Products").select("*");

    if (selectedCategory !== "") {
      query = query.eq("category_id", selectedCategory);
    }

    const { data, error } = await query;

    if (error) {
      toast.error("Mahsulotlarni yuklashda xatolik!");
      console.error(error);
    } else {
      setProducts(data);
      setProductsLeng(data);
    }
    setLoading(false);
  }, [selectedCategory, supabase]);

  const fetchCategory = useCallback(async () => {
    const { data, error } = await supabase.from("Shop_Category").select("*");
    if (error) {
      toast.error("Ma'lumotlarni yuklashda xatolik!");
      console.error(error);
    }
    if (data) {
      setCategories(data);
    }
  }, [supabase]);

  useEffect(() => {
    fetchProducts();
    fetchCategory();
  }, [fetchProducts, fetchCategory]);

  const addToCart = (product: ProductType) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Iltimos, ro‘yxatdan o‘ting!");
      return;
    }

    const existingCart = localStorage.getItem("cart");
    const cartItems: ProductType[] = existingCart
      ? JSON.parse(existingCart)
      : [];

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
    <div className="w-[1500px] mx-auto flex flex-col lg:flex-row justify-start items-start pt-4">
      <ToastContainer />
      <div className="w-full lg:w-1/3 min-h-screen shadow-lg rounded-md p-4 mr-5">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>
        <div
          onClick={() => setSelectedCategory("")}
          className={`flex justify-between text-lg font-semibold mb-2 cursor-pointer ${
            selectedCategory === "" ? "font-bold text-green-500" : ""
          }`}
        >
          <p>Barcha Mahsulotlar</p>
          <p>({productsLeng.length})</p>
        </div>
        {categories.map((category) => (
          <div
            onClick={() => setSelectedCategory(category.id)}
            key={category.id}
            className={`flex justify-between text-lg font-semibold mb-2 cursor-pointer ${
              selectedCategory === category.id ? "font-bold text-green-500" : ""
            }`}
          >
            <p>{category.name}</p>
            <p>
              (
              {
                productsLeng.filter(
                  (product) => product.category_id === category.id
                ).length
              }
              )
            </p>
          </div>
        ))}
        <RangeSlider />
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? [...Array(8)].map((_, index) => (
              <div key={index} className="border p-4 rounded shadow-sm">
                <div className="w-full h-48 bg-gray-200 animate-pulse mb-4 rounded-lg"></div>
                <div className="w-4/5 h-5 bg-gray-200 animate-pulse mb-2 rounded"></div>
                <div className="w-3/5 h-5 bg-gray-200 animate-pulse mb-4 rounded"></div>
              </div>
            ))
          : products.map((product) => (
              <div
                key={product.id}
                className="cursor-pointer border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Image
                  onClick={() =>
                    (location.href = `/productsInfo/${product.id}`)
                  }
                  src={`https://dijgblooocqejrsjbsto.supabase.co/storage/v1/object/public/${product.images[0]}`}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-green-500 font-bold">{product.price} so‘m</p>
                <div className="flex justify-end items-center mt-4">
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
export default HomeProducts;
