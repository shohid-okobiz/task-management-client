"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TaskServices } from "@/services/task/task.service";
import { TaskStatus, CategoryGetData, Task } from "@/types/TaskTypes/taskTypes";
import Link from "next/link";
import TaskCard from "./ui/TaskCard";
import FilterSection from "./ui/FilterSection";
import LoadingGrid from "./ui/LoadingGrid";
import EmptyState from "./ui/EmptyState";


const TaskListPage: React.FC = () => {
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
    <div className="min-h-screen  w-full">
      <div className="max-w-6xl bg-gray-50 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Task List</h1>
            <p className="text-gray-600">
              Manage and track your tasks efficiently
            </p>
          </div>
          <Link
            href="/user-dashboard/create-task"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Task
          </Link>
        </div>

        

        <FilterSection
          category={category}
          status={status}
          categories={categories}
          onCategoryChange={setCategory}
          onStatusChange={setStatus}
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {isLoading ? (
            <LoadingGrid />
          ) : tasks.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Tasks ({tasks.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {tasks.map((task) => (
                  <TaskCard key={task._id} task={task} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;