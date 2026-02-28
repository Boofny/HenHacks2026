"use client";

import { useRouter } from "next/navigation";

export default function GradeButton() {
  const router = useRouter();

  const handleGradeClick = () => {
    router.push("/results"); // navigate to results page
  };

  return (
    <div className="flex flex-col mb-4 text-sm">
      <button
        onClick={handleGradeClick}
        className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
      >
        Grade Resumes
      </button>
    </div>
  );
}