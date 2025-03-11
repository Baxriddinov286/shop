"use client";
import Saidbar from "@/app/_Components/Saidbar";
import { createClient } from "@/supabase/client";
import React, { useEffect, useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface OrderType {
  id: string;
  userId: string;
  userName: string;
  status: string;
  products: { product: string; quantity: number; price: number }[];
}

export default function Order() {
  const supabase = createClient();
  const [orders, setOrders] = useState<OrderType[]>([]);

  const fetchOrders = useCallback(async () => {
    const { data, error } = await supabase.from("Shop_Users").select("*");

    if (error) {
      toast.error("Xatolik yuz berdi");
      console.error("Xatolik:", error);
    } else {
      setOrders(data); // Mahsulotlarni yangilash
    }
  }, [supabase]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="h-screen flex overflow-hidden">
      <Saidbar />
      <div className="w-full py-10 px-10">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-6">Orders</h1>
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">
                {order.userName} (Status: {order.status})
              </h2>
              <div className="mt-2 p-2 border rounded-md">
                {order.products.map((prod, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b py-2"
                  >
                    <span>
                      {prod.product} x {prod.quantity}
                    </span>
                    <span>${prod.price * prod.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 text-right font-bold">
                Total: $
                {order.products.reduce(
                  (sum, p) => sum + p.price * p.quantity,
                  0
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
