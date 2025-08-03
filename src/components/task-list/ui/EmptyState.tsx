"use client";
import React from "react";
import Link from "next/link";

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
      <p className="text-gray-500 mb-6">
        Try adjusting your filters or create a new task to get started.
      </p>
      <Link
        href="/user-dashboard/create-task"
        className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md transition-colors duration-200"
      >
        Create New Task
      </Link>
    </div>
  );
};

export default EmptyState;
