"use client";
import { useEffect } from "react";

export default function Food() {
  useEffect(() => {
    window.location.href =
      "https://light-caption-d04.notion.site/149c1970113f808cacbae808ee087365?v=0aa601184cab47aabb4a7e5381cf7b4e";
  }, []);

  return (
    <div className="text-center mt-10">
      <h1 className="text-lg font-medium text-gray-700">
        Redirecting to Food Table...
      </h1>
    </div>
  );
}
