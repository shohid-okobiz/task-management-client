"use client";
import React from "react";
import Link from "next/link";
import { Task } from "@/types/TaskTypes/taskTypes";

const getStatusBadgeStyle = (status: string) => {
  const statusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    collaborative: "bg-blue-100 text-blue-800",
    ongoing: "bg-orange-100 text-orange-800",
    done: "bg-green-100 text-green-800",
  };
  return statusStyles[status as keyof typeof statusStyles] || "bg-gray-100 text-gray-800";
};

const TaskCard: React.FC<{ task: Task }> = ({ task }) => {
  return (
     <Link href={`/user-dashboard/${task._id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 cursor-pointer border border-gray-200 h-full">
        <div className="flex flex-col h-full">
      
          <div className="flex items-center mb-2">
            <div className="bg-green-500 p-1.5 rounded-full mr-2 flex-shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
              {task.title}
            </h3>
          </div>
   
          <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
            {task.description}
          </p>
          
      
          <div className="flex flex-col space-y-2 mt-auto">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>{task.date}</span>
              </div>
              {task.category?.name && (
                <span className="bg-gray-100 px-2 py-1 rounded-full">
                  {task.category.name}
                </span>
              )}
            </div>
            
         
            <div className="flex justify-end">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(task.task_status)}`}>
                {task.task_status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
