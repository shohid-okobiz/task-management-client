"use client";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { TaskServices } from "@/services/task/task.service";
import { GetTaskListParams, TaskStatus, CategoryGetData, Task } from "@/types/TaskTypes/taskTypes";
import Link from "next/link";

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "collaborative", label: "Collaborative" },
  { value: "ongoing", label: "Ongoing" },
  { value: "done", label: "Done" },
];

const TaskListPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [category, setCategory] = useState<string>("");
  const [status, setStatus] = useState<TaskStatus>("all");

  
  const { data: categoryData } = useQuery({
    queryKey: ["categories"],
    queryFn: TaskServices.processGetategoryHandler,
  });
  const categories: CategoryGetData[] = categoryData?.data || [];

 
  const { data: taskListData, isLoading } = useQuery({
    queryKey: ["tasks", { category, status }],
    queryFn: () => TaskServices.processGetTaskHandler({ category, status }),
  });
  const tasks: Task[] = taskListData?.data?.tasks || [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task List</h1>
        </div>
        <Link
          href="/user-dashboard/create-task"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Create Task
        </Link>
      </div>
      <div className="flex gap-4 mb-6">
        <select
          className="border px-4 py-2 rounded"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <select
          className="border px-4 py-2 rounded"
          value={status}
          onChange={e => setStatus(e.target.value as TaskStatus)}
        >
          {statusOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      <div className="bg-white rounded shadow p-6">
        {isLoading ? (
          <div>Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div>No tasks found.</div>
        ) : (
          <ul className="divide-y">
            {tasks.map(task => (
              <li key={task._id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="font-semibold text-lg">{task.title}</div>
                  <div className="text-gray-500 text-sm">{task.description}</div>
                  <div className="text-xs text-gray-400 mt-1">{task.date} | {task.category?.name}</div>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {task.task_status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskListPage;
