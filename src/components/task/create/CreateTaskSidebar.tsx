import React from "react";

interface Category {
  _id: string;
  name: string;
}

interface Props {
  categories: Category[];
  isCategoryLoading: boolean;
  isCategoryError: boolean;
  queryClient: any;
}

const CreateTaskSidebar: React.FC<Props> = ({ categories, isCategoryLoading, isCategoryError, queryClient }) => (
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
);

export default CreateTaskSidebar;
