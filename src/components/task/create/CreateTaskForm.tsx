import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { TaskServices } from "@/services/task/task.service";
import { CreateTaskPayload, ICategoryGetResponse } from "@/types/TaskTypes/taskTypes";
import Link from "next/link";

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

interface Props {
  categories: Category[];
  isCategoryLoading: boolean;
  isCategoryError: boolean;
  queryClient: ReturnType<typeof useQueryClient>;
  onCategoryCreated: (id: string) => void;
}

const CreateTaskForm: React.FC<Props> = ({
  categories,
  isCategoryLoading,
  isCategoryError,
  queryClient,
  onCategoryCreated,
}) => {
  const [form, setForm] = React.useState<FormData>({
    title: "",
    description: "",
    date: "",
    category: "",
  });
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const [showCategoryInput, setShowCategoryInput] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState("");
  const [categoryLoading, setCategoryLoading] = React.useState(false);
  const [categoryErrorMsg, setCategoryErrorMsg] = React.useState<string | null>(null);

  const router = useRouter();

  const createTaskMutation = useMutation({
    mutationFn: (data: CreateTaskPayload) => TaskServices.processCreateTaskHandler(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["user-tasks"] });
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

  const today = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Title */}
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
          className={`w-full px-4 py-3 border rounded-lg  focus:ring-green-500  focus:outline-none transition-colors ${errors.title && touched.title
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
      {/* Description */}
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
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-green-500  transition-colors resize-none ${errors.description && touched.description
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
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-green-500  transition-colors ${errors.date && touched.date
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
      {/* Category */}
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
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-green-500   transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${errors.category && touched.category
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
        {(!categories.length || showCategoryInput) && (
          <div className="mt-3 flex gap-2 items-center">
            <input
              type="text"
              placeholder="New category name"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              className="flex-1 px-3 py-2 border rounded   focus:ring-green-500"
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
                      onCategoryCreated(res.data[0]._id);
                    } else if (res?.data?._id) {
                      setForm(f => ({ ...f, category: res.data._id }));
                      onCategoryCreated(res.data._id);
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
          onClick={() => window.history.back()}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
