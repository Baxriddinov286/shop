"use client";
import Saidbar from "@/app/_Components/Saidbar";
import { createClient } from "@/supabase/client";
import React, { useEffect, useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";

interface CategoryType {
  id: number;
  name: string;
  desc: string;
  active: boolean;
}

interface ProductType {
  id: number;
  name: string;
  desc: string;
  price: number;
  category_id: string;
  active: boolean;
  images: string[];
}

function Dashboard() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [products, setProducts] = useState<ProductType[]>([]);

  const supabase = createClient();

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

  const fetchProducts = useCallback(async () => {
    const { data, error } = await supabase.from("Shop_Products").select("*");
    if (error) {
      toast.error("Mahsulotlarni yuklashda xatolik!");
      console.error(error);
    } else {
      setProducts(data);
    }
  }, [supabase]);

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, [fetchCategory, fetchProducts]);

  return (
    <div className="flex">
      <ToastContainer />
      <Saidbar />
      <div className="w-full py-10 px-10">
        <h1 className="text-4xl font-bold mb-5">Hi, Admin 👋</h1>
        <div className="flex space-x-5 mb-5">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Overview
          </button>
          <button
            className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg"
            disabled
          >
            Analytics
          </button>
        </div>
        <div className="grid grid-cols-4 gap-5">
          <div className="shadow-lg rounded-2xl px-10 py-10 hover:scale-110 duration-150">
            <h2 className="text-2xl font-bold mb-5">Total Categories</h2>
            <h2 className="text-4xl font-bold text-blue-500">
              {categories.length}x
            </h2>
            <p className="text-gray-500">+20.1% from last month</p>
          </div>
          <div className="shadow-lg rounded-2xl px-10 py-10 hover:scale-110 duration-150">
            <h2 className="text-2xl font-bold mb-5">Total Products</h2>
            <h2 className="text-4xl font-bold text-blue-500">
              {products.length}x
            </h2>
            <p className="text-gray-500">+18.1% from last month</p>
          </div>
          <div className="shadow-lg rounded-2xl px-10 py-10 hover:scale-110 duration-150">
            <h2 className="text-2xl font-bold mb-5">Total Users</h2>
            <h2 className="text-4xl font-bold text-blue-500">4x</h2>
            <p className="text-gray-500">+19% from last month</p>
          </div>
          <div className="shadow-lg rounded-2xl px-10 py-10 hover:scale-110 duration-150">
            <h2 className="text-2xl font-bold mb-5">Orders</h2>
            <h2 className="text-4xl font-bold text-blue-500">8x</h2>
            <p className="text-gray-500">+201 since last hour</p>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Recent Sales</h2>
          <p className="text-gray-500">You made 15 sales this month.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
