"use client";
import React, { useEffect, useState, useCallback } from "react";
import { createClient } from "@/supabase/client";
import { toast } from "react-toastify";
import Navbar from "../_Components/navbar";

interface UserData {
  id: string;
  name: string;
  lastName: string;
  email: string;
  password?: string; 
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const supabase = createClient();

  const fetchUserData = useCallback(
    async (userId: string) => {
      const { data, error } = await supabase
        .from("Shop_Users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        toast.error("Foydalanuvchi ma'lumotlarini yuklashda xatolik!");
        console.error(error);
      } else {
        setUserData(data);
      }
    },
    [supabase]
  );

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchUserData(userId);
    }
  }, [fetchUserData]);

  const handleUpdate = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId || !userData) return;

    const { error } = await supabase
      .from("Shop_Users")
      .update({
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      })
      .eq("id", userId);

    if (error) {
      toast.error("Ma'lumotlarni yangilashda xatolik!");
      console.error(error);
    } else {
      toast.success("Ma'lumotlar yangilandi!");
      setIsEditing(false);
    }
  };

  if (!userData) {
    return (
      <p className="text-center text-red-500">Iltimos, ro‘yxatdan o‘ting!</p>
    );
  }

  return (
    <div className="max-w-[1500px] mx-auto">
      <Navbar />

      <div className="max-w-lg mx-auto mt-10 p-6 shadow-md rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-4">Profil</h2>

        <div className="space-y-4">
          <label className="w-full">
            Name
            <input
              type="text"
              value={userData.name || ""}
              onChange={(e) =>
                setUserData((prev) =>
                  prev ? { ...prev, name: e.target.value } : prev
                )
              }
              className="form-control"
              placeholder="Name.."
            />
          </label>
          <label className="w-full">
            LastName
            <input
              type="text"
              value={userData.lastName || ""}
              onChange={(e) =>
                setUserData((prev) =>
                  prev ? { ...prev, lastName: e.target.value } : prev
                )
              }
              className="form-control"
              placeholder="LastName.."
            />
          </label>
          <label className="w-full">
            Email
            <input
              type="email"
              value={userData.email || ""}
              onChange={(e) =>
                setUserData((prev) =>
                  prev ? { ...prev, email: e.target.value } : prev
                )
              }
              className="form-control"
              placeholder="Email.."
            />
          </label>
          <label className="w-full">
            Password
            <input
              type="text"
              value={userData.password || ""}
              onChange={(e) =>
                setUserData((prev) =>
                  prev ? { ...prev, password: e.target.value } : prev
                )
              }
              className="form-control"
              placeholder="Password.."
            />
          </label>

          {isEditing && (
            <button
              onClick={handleUpdate}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Saqlash
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
