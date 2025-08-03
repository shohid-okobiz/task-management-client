

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiBaseUrl } from "@/config/config";

interface Category {
  _id: string;
  name: string;
}

const CreateTaskPage: React.FC = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        


        const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
        const res = await fetch(`${apiBaseUrl}/category`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          credentials: "include",
        });

        const data = await res.json();
        setCategories(data?.data || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { title, description, date, category } = form;
    if (!title || !description || !date || !category) {
      setError("All fields are required");
      return;
    }

    try {
      setSubmitLoading(true);
    


      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
      const res = await fetch(`${apiBaseUrl}/create-new-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Failed to create task");
      }

      router.push("/user-dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white max-w-6xl  mx-auto items-center justify-center">
      <div className="rounded shadow p-8 w-full ">
        <h1 className="text-2xl font-bold mb-6">Create Task</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
            disabled={loadingCategories}
          >
            <option value="">Select Category</option>
            {loadingCategories ? (
              <option disabled>Loading...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow"
            disabled={submitLoading}
          >
            {submitLoading ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;









// "use client";

// import React, { useState } from "react";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   CreateTaskPayload,
//   ICategoryGetResponse,
// } from "@/types/TaskTypes/taskTypes";
// import { useRouter } from "next/navigation";
// import { TaskServices } from "@/services/task/task.service";

// const CreateTaskPage: React.FC = () => {
//   const [form, setForm] = useState<CreateTaskPayload>({
//     title: "",
//     description: "",
//     date: "",
//     category: "",
//   });
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const queryClient = useQueryClient();

 
//   const {
//     data: categoryData,
//     isLoading: isCategoryLoading,
//     isError: isCategoryError,
//   } = useQuery<ICategoryGetResponse>({
//     queryKey: ["categories"],
//     queryFn: TaskServices.processGetategoryHandler,
//   });

 
//   const { mutate, isPending } = useMutation({
//     mutationFn: TaskServices.processCreateTaskHandler,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["tasks"] });
//       router.push("/user-dashboard");
//     },
//     onError: (err: any) => {
//       setError(err?.message || "Failed to create task");
//     },
//   });

  
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

 
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const { title, description, date, category } = form;
//     if (!title || !description || !date || !category) {
//       setError("All fields are required");
//       return;
//     }

//     mutate(form);
//   };

//   const categories = categoryData?.data || [];
//   console.log("categouuy --- ", categories)

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
//       <div className="bg-white rounded shadow p-8 w-full max-w-lg">
//         <h1 className="text-2xl font-bold mb-6">Create Task</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             placeholder="Title"
//             className="w-full border px-4 py-2 rounded"
//           />
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Description"
//             className="w-full border px-4 py-2 rounded"
//           />
//           <input
//             name="date"
//             type="date"
//             value={form.date}
//             onChange={handleChange}
//             className="w-full border px-4 py-2 rounded"
//           />
//           <select
//             name="category"
//             value={form.category}
//             onChange={handleChange}
//             className="w-full border px-4 py-2 rounded"
//             disabled={isCategoryLoading || isCategoryError}
//           >
//             <option value="">Select Category</option>
//             {isCategoryLoading && <option disabled>Loading...</option>}
//             {isCategoryError && <option disabled>Error loading categories</option>}
//             {categories.map((cat: any) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           {error && <div className="text-red-500 text-sm">{error}</div>}

//           <button
//             type="submit"
//             className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow"
//             disabled={isPending}
//           >
//             {isPending ? "Creating..." : "Create Task"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateTaskPage;
