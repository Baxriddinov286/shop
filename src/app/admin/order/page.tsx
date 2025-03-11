"use client";
import Saidbar from "@/app/_Components/Saidbar";
import { createClient } from "@/supabase/client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface OrderType {
  id: string;
  userId: string;
  userName: string;
  userLastName: string;
  status: string;
}

export default function Order() {
  const supabase = createClient();
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase.from("Shop_Order_Product").select(`
      product,
      quantity,
      orderId (*),
    `);

    if (error) {
      toast.error("Xatolik yuz berdi");
    } else {
      console.log(data);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <Saidbar />
      <div className="w-full py-10 px-10">
        <ToastContainer />
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">Order</h1>
        </div>
        <div className="h-[650px] flex items-start justify-between gap-2 border p-3 rounded-md">
          <div className="w-full h-full overflow-y-scroll shadow-lg border p-2 rounded-lg">
            <h1 className="text-2xl font-bold text-center">Open</h1>
          </div>
          <div className="w-full h-full overflow-y-scroll shadow-lg border p-2 rounded-lg">
            <h1 className="text-2xl font-bold text-center">Pending</h1>
          </div>
          <div className="w-full h-full overflow-y-scroll shadow-lg border p-2 rounded-lg">
            <h1 className="text-2xl font-bold text-center">Close</h1>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
