"use client";

import "./globals.css";
import UploadSection from "./components/UploadSection";
import ParametersSection from "./components/ParametersSection";
import GradeButton from "./components/GradeButton";
import { useState } from "react";
import AnalyzeButton from "./components/GradeButton";


export default function Home() {
  // State to hold the final built string
  const [paramsString, setParamsString] = useState<string>("");

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-8">
      <div className="bg-white w-full max-w-5xl p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold mb-10 text-gray-900">
          Active Resume Grader
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left side: Upload*/}
          <UploadSection />

          {/* Right side: Parameters + Button*/}
          <div className="flex flex-col">
            {/* Pass the setter to ParametersSection */}
            <ParametersSection setParamsString={setParamsString} />
            
            {/* Pass the actual string to your Analyze/Grade button */}
            <AnalyzeButton paramsString={paramsString} />
          </div>
        </div>
      </div>
    </div>
  );
}

/*
export default function Home() {
  const [paramsString, setParamsString] = useState<string>("");
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-8">
      <div className="bg-white w-full max-w-5xl p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold mb-10 text-gray-900">
          Active Resume Grader
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left side: Upload}
          <UploadSection />

          {/* Right side: Parameters + Button }
          <div className="flex flex-col">
            <ParametersSection />
            <GradeButton />
          </div>
        </div>
      </div>
    </div>
  );
  }
  */