"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../_Components/navbar";
import { createClient } from "@/supabase/client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductType {
  id: string;
  name: string;
  price: number;
  images: string[];
  count: number;
}

export default function Buy() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [userOrder, setUserOrder] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: "",
  });

  const supabase = createClient();

  useEffect(() => {
    const storedOrder = localStorage.getItem("order");
    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder);
      setProducts(parsedOrder?.products || []);
      setTotal(parsedOrder?.total || 0);
    }
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return toast.error("User ID topilmadi!");

      if (
        !userOrder.firstName.trim() ||
        !userOrder.lastName.trim() ||
        !userOrder.address.trim() ||
        !userOrder.email.trim() ||
        !userOrder.phone.trim()
      ) {
        return toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      }

      if (products.length === 0) {
        return toast.error("Buyurtma uchun mahsulot tanlanmagan!");
      }

      const { data: order, error: orderError } = await supabase
        .from("Shop_Order")
        .insert({
          userId,
          location: userOrder.address,
          phone: userOrder.phone,
          status: "open",
          totalPrice: total,
          createdAt: new Date(),
        })
        .select("id")
        .single();

      if (orderError) throw new Error(orderError.message);
      const orderId = order.id;

      const orderProducts = products.map((product) => ({
        orderId,
        product: product.id,
        quantity: product.count,
      }));

      const { error: orderProductError } = await supabase
        .from("Shop_Order_Product")
        .insert(orderProducts);

      if (orderProductError) throw new Error(orderProductError.message);

      toast.success("Buyurtma muvaffaqiyatli joylandi!");
      localStorage.removeItem("order");
      location.href = "/";
    } catch (error: any) {
      toast.error(`Xatolik: ${error.message}`);
      console.error(error);
    }
  };

  return (
    <div className="w-[1500px] mx-auto">
      <Navbar />
      <ToastContainer />
      <div className="w-full mt-3 flex justify-between items-start">
        <div>
          <h1>Billing Address</h1>
          <div className="grid grid-cols-2 gap-4">
            <label>
              First Name*
              <input
                value={userOrder.firstName}
                onChange={(e) =>
                  setUserOrder({ ...userOrder, firstName: e.target.value })
                }
                type="text"
                className="form-control"
              />
            </label>
            <label>
              Last Name*
              <input
                value={userOrder.lastName}
                onChange={(e) =>
                  setUserOrder({ ...userOrder, lastName: e.target.value })
                }
                type="text"
                className="form-control"
              />
            </label>
            <label>
              Street Address*
              <input
                value={userOrder.address}
                onChange={(e) =>
                  setUserOrder({ ...userOrder, address: e.target.value })
                }
                type="text"
                className="form-control"
                placeholder="House number and street name"
              />
            </label>
            <label>
              Email Address*
              <input
                value={userOrder.email}
                onChange={(e) =>
                  setUserOrder({ ...userOrder, email: e.target.value })
                }
                type="email"
                className="form-control"
              />
            </label>
            <label>
              Phone Number*
              <input
                value={userOrder.phone}
                onChange={(e) =>
                  setUserOrder({ ...userOrder, phone: e.target.value })
                }
                type="tel"
                className="form-control"
              />
            </label>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="cursor-pointer border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={`https://dijgblooocqejrsjbsto.supabase.co/storage/v1/object/public/${product.images[0]}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-green-500 font-bold">{product.price} so‘m</p>
              <p className="text-gray-500 font-bold">{product.count}</p>

              
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-end mt-8">
        <h3 className="text-xl font-bold mt-8">Jami: {total} so‘m</h3>
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
