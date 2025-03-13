"use client";
import Saidbar from "@/app/_Components/Saidbar";
import { createClient } from "@/supabase/client";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { toast, ToastContainer } from "react-toastify";

interface UsersType {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export default function Page() {
  const [users, setUsers] = useState<UsersType[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("Shop_Users").select("*");
    if (error) {
      toast.error("Userlarni yuklashda xatolik!");
      console.error(error);
    } else {
      setUsers(data);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    const { error } = await supabase.from("Shop_Users").delete().eq("id", id);

    if (error) {
      toast.error("User o‘chirishda xatolik yuz berdi!");
      console.error(error);
    } else {
      toast.success("User muvaffaqiyatli o‘chirildi!");
      fetchProducts();
      setLoading(false);
    }
  };

  return (
    <div className="flex">
      <Saidbar />
      <div className="w-full py-10 px-10">
        <ToastContainer />
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold">Products</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 focus:scale-75 transition-all duration-300">
            + Add New
          </button>
        </div>
        <table className="table table-light table-hover">
          <thead>
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Password</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 7 }).map((_, index) => (
                  <tr key={index}>
                    <td>
                      <Skeleton width={300} />
                    </td>
                    <td>
                      <Skeleton width={120} />
                    </td>
                    <td>
                      <Skeleton width={120} />
                    </td>
                    <td>
                      <Skeleton width={180} />
                    </td>
                    <td>
                      <Skeleton width={80} />
                    </td>
                    <td>
                      <Skeleton width={100} />
                    </td>
                    <td>
                      <Skeleton width={100} />
                    </td>
                  </tr>
                ))
              : users.map((user: UsersType, index) => {
                  return (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.password}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn btn-danger"
                        >
                          <MdDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
