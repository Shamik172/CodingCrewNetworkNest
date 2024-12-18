import React from 'react';

const Loading = () => {
  const placeholderCount = 18; // Number of placeholders

  return (
    <div className="p-10 m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl shadow-black relative top-20">
      {Array.from({ length: placeholderCount }).map((_, index) => (
        <div key={index} className="border  shadow  dark:shadow-white rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-700 dark:bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-700 dark:bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 dark:bg-slate-200 bg-slate-700 rounded col-span-2"></div>
                  <div className="h-2 dark:bg-slate-200 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="h-2 dark:bg-slate-200 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
