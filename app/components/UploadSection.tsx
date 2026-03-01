"use client";

import { useRef, useState, useEffect } from "react";
import { setFiles, getFiles } from "../lib/fileStore";

interface UploadSectionProps {
  onFilesChange?: (files: File[]) => void;
}

export default function UploadSection({ onFilesChange }: UploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setFiles(filesArray); // store globally
      setSelectedFiles(filesArray); // store locally for rendering
      onFilesChange?.(filesArray);
    }
  };

  // Sync with global store on mount and notify parent so logo visibility is correct
  useEffect(() => {
    const files = getFiles();
    setSelectedFiles(files);
    onFilesChange?.(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4 space-y-4 w-full">
      <h1 className="text-lg font-bold text-gray-900">Upload Resumes</h1>

      <input
        type="file"
        accept="application/pdf"
        multiple
        ref={fileInputRef}
        hidden
        onChange={handleFiles}
      />

      <button
        onClick={handleButtonClick}
        className="hover:cursor-pointer w-full h-11 rounded-lg bg-gradient-to-r from-green-400 to-green-300 text-black font-semibold shadow-sm hover:from-green-300 hover:to-green-200 hover:shadow-md transition"
      >
        Select PDF files
      </button>

      {/* Display selected file names */}
      {selectedFiles.length > 0 && (
        <div className="mt-3 bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-600 tracking-wide uppercase">
              Selected files
            </span>
            <span className="text-xs text-gray-500">
              {selectedFiles.length} PDF{selectedFiles.length > 1 ? "s" : ""}
            </span>
          </div>

          <ul className="max-h-40 overflow-y-auto divide-y divide-gray-100">
            {selectedFiles.map((file, index) => (
              <li
                key={file.name + index}
                className="px-3 py-2 flex items-center justify-between"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {Math.max(1, Math.round(file.size / 1024))} KB
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
