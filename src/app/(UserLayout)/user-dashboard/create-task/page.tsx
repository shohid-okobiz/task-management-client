"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TaskServices } from "@/services/task/task.service";
import { CreateTaskPayload, ICategoryGetResponse } from "@/types/TaskTypes/taskTypes";

interface Category {
  _id: string;
  name: string;
}

interface FormData {
  title: string;
  description: string;
  date: string;
  category: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  date?: string;
  category?: string;
  submit?: string;
}

const CreateTaskPage: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    title: "",
    description: "",
    date: "",
    category: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryErrorMsg, setCategoryErrorMsg] = useState<string | null>(null);

  const router = useRouter();
  const queryClient = useQueryClient();

 
  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
    error: categoryError,
  } = useQuery<ICategoryGetResponse>({
    queryKey: ["categories"],
    queryFn: TaskServices.processGetategoryHandler,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  
  const createTaskMutation = useMutation({
    mutationFn: (data: CreateTaskPayload) => TaskServices.processCreateTaskHandler(data),
    onSuccess: () => {
  
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["user-tasks"] });

      console.log("Task created successfully!");

      
      router.push("/user-dashboard/");
    },
    onError: (err: any) => {
      setErrors({ submit: err?.message || "Failed to create task. Please try again." });
    },
  });

 
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "title":
        if (!value.trim()) return "Title is required";
        if (value.trim().length < 3) return "Title must be at least 3 characters";
        if (value.trim().length > 100) return "Title must be less than 100 characters";
        break;
      case "description":
        if (!value.trim()) return "Description is required";
        if (value.trim().length < 10) return "Description must be at least 10 characters";
        if (value.trim().length > 500) return "Description must be less than 500 characters";
        break;
      case "date":
        if (!value) return "Due date is required";
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return "Due date cannot be in the past";
        break;
      case "category":
        if (!value) return "Please select a category";
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key as keyof FormData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

 
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ submit: undefined });

 
    const allTouched = Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    
    const taskData: CreateTaskPayload = {
      title: form.title.trim(),
      description: form.description.trim(),
      date: form.date,
      category: form.category,
    };

    createTaskMutation.mutate(taskData);
  };

  const categories = categoryData?.data || [];

 
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <Link href="/user-dashboard" className="hover:text-green-600 transition-colors">
              Dashboard
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/user-dashboard/tasks" className="hover:text-green-600 transition-colors">
              Tasks
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">Create New Task</span>
          </nav>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Create New Task</h1>
                <p className="text-gray-600 mt-1">Add a new task to your workflow</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
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

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Task Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Task Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter task title..."
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${errors.title && touched.title
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 hover:border-gray-400'
                      }`}
                    maxLength={100}
                  />
                  {errors.title && touched.title && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.title}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">{form.title.length}/100 characters</p>
                </div>

             
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Describe your task in detail..."
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none ${errors.description && touched.description
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 hover:border-gray-400'
                      }`}
                    maxLength={500}
                  />
                  {errors.description && touched.description && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.description}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">{form.description.length}/500 characters</p>
                </div>

                {/* Due Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min={today}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${errors.date && touched.date
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 hover:border-gray-400'
                      }`}
                  />
                  {errors.date && touched.date && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.date}
                    </p>
                  )}
                </div>

              
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isCategoryLoading || categoryLoading}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.category && touched.category
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    <option value="">
                      {isCategoryLoading ? "Loading categories..." : "Select a category"}
                    </option>
                    {categories.map((cat: Category) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {/* Inline create category if no categories or user wants to add */}
                  {(!categories.length || showCategoryInput) && (
                    <div className="mt-3 flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="New category name"
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                        className="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                        disabled={categoryLoading}
                        maxLength={30}
                      />
                      <button
                        type="button"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:bg-green-300"
                        disabled={categoryLoading || !newCategory.trim()}
                        onClick={async () => {
                          setCategoryLoading(true);
                          setCategoryErrorMsg(null);
                          try {
                            const res:any= await TaskServices.processCreateCetegoryHandler({ name: newCategory.trim() });
                            await queryClient.invalidateQueries({ queryKey: ["categories"] });
                            setShowCategoryInput(false);
                            setNewCategory("");
                           
                            setTimeout(() => {
                              if (res?.data?.[0]?._id) {
                                setForm(f => ({ ...f, category: res.data[0]._id }));
                              } else if (res?.data?._id) {
                                setForm(f => ({ ...f, category: res.data._id }));
                              }
                            }, 500);
                          } catch (err: any) {
                            setCategoryErrorMsg(err?.message || "Failed to create category");
                          } finally {
                            setCategoryLoading(false);
                          }
                        }}
                      >
                        {categoryLoading ? "Creating..." : "Add"}
                      </button>
                    </div>
                  )}
                  {/* Show add new category link if categories exist */}
                  {categories.length > 0 && !showCategoryInput && (
                    <button
                      type="button"
                      className="mt-2 text-green-600 text-sm hover:underline"
                      onClick={() => setShowCategoryInput(true)}
                    >
                      + Create new category
                    </button>
                  )}
                  {categoryErrorMsg && (
                    <p className="mt-1 text-sm text-red-600">{categoryErrorMsg}</p>
                  )}
                  {errors.category && touched.category && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.category}
                    </p>
                  )}
                  {isCategoryError && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Failed to load categories. Please refresh the page.
                    </p>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex">
                      <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-red-700">{errors.submit}</p>
                    </div>
                  </div>
                )}

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                  <button
                    type="submit"
                    disabled={createTaskMutation.isPending || isCategoryLoading}
                    className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center"
                  >
                    {createTaskMutation.isPending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Task...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Create Task
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Tips */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Tips for Better Tasks</h3>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Use clear, actionable titles that describe what needs to be done</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Include specific details and requirements in the description</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Set realistic due dates to avoid overwhelming yourself</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p>Choose appropriate categories for better organization</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories Available</h3>

              {isCategoryLoading ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
                  <span className="ml-2 text-sm text-gray-500">Loading...</span>
                </div>
              ) : isCategoryError ? (
                <div className="text-center py-4">
                  <div className="text-red-500 text-sm">Failed to load categories</div>
                  <button
                    onClick={() => queryClient.invalidateQueries({ queryKey: ["categories"] })}
                    className="text-green-600 text-sm hover:text-green-700 mt-1"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {categories.length > 0 ? (
                    categories.map((cat: Category) => (
                      <div
                        key={cat._id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm text-gray-700">{cat.name}</span>
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">No categories available</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPage;