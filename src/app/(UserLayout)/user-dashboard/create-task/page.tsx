"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CreateTaskForm from "@/components/task/create/CreateTaskForm";
import CreateTaskSidebar from "@/components/task/create/CreateTaskSidebar";
import { TaskServices } from "@/services/task/task.service";
import { ICategoryGetResponse } from "@/types/TaskTypes/taskTypes";

const CreateTaskPage: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useQuery<ICategoryGetResponse>({
    queryKey: ["categories"],
    queryFn: TaskServices.processGetategoryHandler,
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });
  const categories = categoryData?.data || [];
  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl bg-gray-50  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <a href="/user-dashboard" className="hover:text-green-600 transition-colors">
              Dashboard
            </a>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <a href="/user-dashboard/tasks" className="hover:text-green-600 transition-colors">
              Tasks
            </a>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">Create New Task</span>
          </nav>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Task Details</h2>
                </div>
              </div>
              <CreateTaskForm
                categories={categories}
                isCategoryLoading={isCategoryLoading}
                isCategoryError={isCategoryError}
                queryClient={queryClient}
                onCategoryCreated={() => {}}
              />
            </div>
          </div>
          <CreateTaskSidebar
            categories={categories}
            isCategoryLoading={isCategoryLoading}
            isCategoryError={isCategoryError}
            queryClient={queryClient}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPage;