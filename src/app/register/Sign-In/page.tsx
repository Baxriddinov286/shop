"use client";
import React, { useState } from "react";
import { createClient } from "@/supabase/client";
import { toast, ToastContainer } from "react-toastify";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const supabase = createClient();

  const handleSignIn = async () => {
    if (!email || !password) {
      toast.error("Email va parolni kiriting!");
      return;
    }

    const { data, error } = await supabase
      .from("Shop_Users")
      .select("id, role")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      toast.error("Email yoki parol noto‘g‘ri!");
      return;
    }

    localStorage.setItem("userId", data.id);

    toast.success("Kirish muvaffaqiyatli!");

    setTimeout(() => {
      location.href = data.role === "admin" ? "/admin" : "/";
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-3 p-6 max-w-sm mx-auto shadow-lg rounded-lg mt-28 ">
      <ToastContainer />
      <h2 className="text-2xl font-bold">Sign In</h2>
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
        onClick={handleSignIn}
        className="bg-blue-500 text-white p-2 shadow-lg"
      >
        Sign In
      </button>
      <a href="/register/Sign-Up">Sign Up</a>
    </div>
  );
}
