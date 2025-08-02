"use client";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskServices } from "@/services/task/task.service";
import { CreateTaskPayload } from "@/types/TaskTypes/taskTypes";
import { useRouter } from "next/navigation";

const CreateTaskPage: React.FC = () => {
  const [form, setForm] = useState<CreateTaskPayload>({
    title: "",
    description: "",
    date: "",
    category: ""
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: TaskServices.processCreateTaskHandler,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      router.push("/user-dashboard/task-list");
    },
    onError: (err: any) => {
      setError(err?.message || "Failed to create task");
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.description || !form.date || !form.category) {
      setError("All fields are required");
      return;
    }
    mutate(form);
  };

  // Fetch categories for dropdown
  // (Assume categories are already cached from task list page)
  const categories = queryClient.getQueryData<any>(["categories"])?.data || [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded shadow p-8 w-full max-w-lg">
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
          >
            <option value="">Select Category</option>
            {categories.map((cat: any) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskPage;
