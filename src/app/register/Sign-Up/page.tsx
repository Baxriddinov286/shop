"use client";
import { createClient } from "@/supabase/client";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function SignUp() {
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClient();

  const handleSignUp = async () => {
    if (!name || !lastname || !email || !password) {
      toast.error("Barcha maydonlarni to‘ldiring!");
      return;
    }

    const { data: existingUser, error: checkError } = await supabase
      .from("Shop_Users")
      .select("id")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      toast.error("Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.");
      return;
    }

    if (existingUser) {
      toast.warning("Bu email allaqachon ro‘yxatdan o‘tgan!");
      return;
    }

    const isAdmin =
      name.toLowerCase().includes("admin") && password === "adminstrator";
    const role = isAdmin ? "admin" : "user";

    const { data, error } = await supabase
      .from("Shop_Users")
      .insert([{ name, lastName: lastname, password, email, role }])
      .select("id")
      .single();

    if (error) {
      toast.error("Xatolik: " + error.message);
    } else {
      toast.success("Ro‘yxatdan o‘tish muvaffaqiyatli!");
      localStorage.setItem("userId", data.id);
      setTimeout(() => (location.href = "/"), 1500);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-6 max-w-sm mx-auto shadow-lg rounded-lg mt-28">
      <ToastContainer />
      <h2 className="text-2xl font-bold">Sign Up</h2>
      <input
        type="text"
        placeholder="Ism"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control mb-2 shadow-md"
      />
      <input
        type="text"
        placeholder="Familiya"
        value={lastname}
        onChange={(e) => setLastName(e.target.value)}
        className="form-control mb-2 shadow-md"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-control mb-2 shadow-md"
      />
      <input
        type="password"
        placeholder="Parol"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-control mb-2 shadow-md"
      />
      <button
        onClick={handleSignUp}
        className="bg-green-500 text-white p-2 shadow-lg"
      >
        Sign Up
      </button>
      <a href="/register">Sign In</a>
    </div>
  );
}
