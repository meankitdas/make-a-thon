"use client";
import { useEffect } from "react";

export default function Guidelines() {
  useEffect(() => {
    window.location.href = "https://www.notion.so/your-guidelines-link";
  }, []);

  return (
    <div className="text-center mt-10">
      <h1 className="text-lg font-medium text-gray-700">
        Redirecting to Guidelines...
      </h1>
    </div>
  );
}
