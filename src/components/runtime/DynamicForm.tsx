import React from 'react';

export default function DynamicForm({ page }: { page: any }) {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6">{page.title || 'Form View'}</h2>
        
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-1.5">
            <label className="font-medium text-sm text-gray-700">Sample Input Field</label>
            <input 
              type="text" 
              className="border border-gray-300 rounded-md p-2.5 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
              placeholder="Enter value..." 
            />
          </div>
          
          <div className="pt-4">
            <button 
              type="button" 
              className="w-full bg-black text-white rounded-md p-2.5 font-medium hover:bg-gray-800 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
