"use client";
import React from "react";
import { TaskStatus, CategoryGetData } from "@/types/TaskTypes/taskTypes";

const statusOptions: { value: TaskStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "collaborative", label: "Collaborative" },
  { value: "ongoing", label: "Ongoing" },
  { value: "done", label: "Done" },
];

const FilterSection: React.FC<{
  category: string;
  status: TaskStatus;
  categories: CategoryGetData[];
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: TaskStatus) => void;
}> = ({ category, status, categories, onCategoryChange, onStatusChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            className="w-full border border-gray-300  rounded-md px-3 py-2 focus:outline-none  focus:ring-green-500  "
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none   "
            value={status}
            onChange={(e) => onStatusChange(e.target.value as TaskStatus)}
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
