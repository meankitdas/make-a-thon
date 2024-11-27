"use client";
import { useEffect } from "react";

export default function Food() {
  useEffect(() => {
    window.location.href =
      "https://light-caption-d04.notion.site/149c1970113f808cacbae808ee087365?v=0aa601184cab47aabb4a7e5381cf7b4e";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-lg font-medium text-gray-700 mb-4">
        Redirecting to Food Table...
      </h1>
      <div className="loader border-t-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
      <style jsx>{`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
