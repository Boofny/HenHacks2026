"use client";

import "./globals.css";
import UploadSection from "./components/UploadSection";
import ParametersSection from "./components/ParametersSection";
import GradeButton from "./components/GradeButton";
import { useState } from "react";
import AnalyzeButton from "./components/GradeButton";
import logo from './assets/skillScanlogo.png';

export default function Home() {
  const [paramsString, setParamsString] = useState<string>("");
  const [hasFiles, setHasFiles] = useState(false);

  return (
    <div className="min-h-screen bg-green-300 flex justify-center items-start p-8">
      <div className="border-6 border-gray-600 bg-white w-full max-w-6xl p-10 rounded-xl shadow-lg drop-shadow-md">
        
        {/* Main Title at the top */}
        <h1 className="flex items-center gap-3 text-4xl font-extrabold tracking-tight mb-10">
        <span className="text-transparent bg-clip-text bg-gray-800 drop-shadow-sm">
          Skill Scan
          </span>
          {/* The Beta badge */}
          <span className="bg-green-200 text-green-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm mt-1">
            Beta
          </span>
        </h1>
        <div className="grid md:grid-cols-2 gap-10">
          
          {/* LEFT SIDE: Upload Section + Big Logo (logo hidden when files selected) */}
          <div className="flex flex-col">
            <UploadSection onFilesChange={(files) => setHasFiles(files.length > 0)} />
            
            {/* BIG LOGO CONTAINER — hides when files are selected so list doesn't overlap */}
            {!hasFiles && (
              <div className="flex-grow flex justify-center items-center mt-12 mb-6">
                <img 
                  src={logo.src} 
                  alt="Skill Scan Logo" 
                  className="w-full max-w-sm object-contain opacity-90" 
                />
              </div>
            )}
          </div>

          {/* RIGHT SIDE: Parameters + Button */}
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
