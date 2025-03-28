"use client";
import Navbar from "@/app/_Components/navbar";
import { createClient } from "@/supabase/client";
import React, { useEffect, useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import { useRouter } from "next/router";

interface ProductType {
  id: number;
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

const Page = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const router = useRouter();
  const { id } = router.query;
  const supabase = createClient();
  const [imgIndex, setImgIndex] = useState(0);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

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
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("Shop_Products")
        .select("*")
        .eq("id", id);

      if (data && data.length > 0) {
        setProduct(data[0]);
      }
      setLoading(false);
    };

    fetchProducts();
    fetchCategory();
  }, [id, fetchCategory]);

  const category = categories.find((cat) => cat.id === product?.category_id);

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
    <div className="w-[1500px] mx-auto">
      <Navbar />
      <ToastContainer />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div className="flex items-start gap-3">
          <div className="flex flex-col gap-2 justify-start">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <Skeleton
                      key={index}
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                  ))
              : product?.images?.map((img: string, index: number) => (
                  <Image
                    onMouseEnter={() => setImgIndex(index)}
                    key={index}
                    src={`https://dijgblooocqejrsjbsto.supabase.co/storage/v1/object/public/${img}`}
                    alt={`${index}`}
                    width={80}
                    height={80}
                    className={`rounded-lg cursor-pointer border border-gray-300 hover:border-gray-600 transition-opacity ${
                      imgIndex === index ? "opacity-100" : "opacity-50"
                    }`}
                  />
                ))}
          </div>
          <div>
            {loading ? (
              <Skeleton width={500} height={384} className="rounded-lg" />
            ) : (
              <Image
                src={`https://dijgblooocqejrsjbsto.supabase.co/storage/v1/object/public/${product?.images[imgIndex]}`}
                alt={product?.name || "Mahsulot rasmi"}
                width={500}
                height={384}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>
        <div className="space-y-4">
          {loading ? (
            <Skeleton width={300} height={40} />
          ) : (
            <h1 className="text-4xl font-bold">{product?.name}</h1>
          )}

          {loading ? (
            <Skeleton width={150} height={30} />
          ) : (
            <p className="text-3xl font-semibold text-green-600">
              ${product?.price}
            </p>
          )}

          {loading ? (
            <Skeleton width={250} height={20} />
          ) : (
            <p className="text-gray-500 text-sm">
              <strong>Short Description:</strong> {product?.desc}
            </p>
          )}

          <div className="flex items-center space-x-4 mt-4">
            {loading ? (
              <>
                <Skeleton width={150} height={50} />
                <Skeleton width={150} height={50} />
              </>
            ) : (
              <>
                <button className="btn btn-outline-success">Buy Now</button>
                <button
                  onClick={() => addToCart(product!)}
                  className="btn btn-outline-success"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => toggleLike(product!)}
                  className="btn btn-outline-success"
                >
                  <FaHeart />
                </button>
              </>
            )}
          </div>

          <div>
            {loading ? (
              <Skeleton width={250} height={20} />
            ) : (
              <p className="text-gray-500 text-sm">
                <strong>Categories: </strong> {category?.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
