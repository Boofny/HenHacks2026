// "use client";
//
// export default function UploadSection() {
//   return (
//     <div className="flex flex-col">
//       <h2 className="text-xl font-medium mb-4">Upload Resumes</h2>
//       <input
//         type="file"
//         multiple
//         accept="application/pdf"
//         className="border border-gray-300 rounded-md p-2"
//       />
//       <p className="text-foreground text-sm mt-2">PDF files only</p>
//     </div>
//   );
// }

"use client";

import { useRef, useState, useEffect } from "react";
import { setFiles, getFiles } from "../lib/fileStore";

export default function UploadSection() {
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
    }
  };

  // Optional: sync with global store if files change elsewhere
  useEffect(() => {
    setSelectedFiles(getFiles());
  }, []);

  return (
    <div className="p-4 space-y-4 w-full">
      <h1 className="text-lg font-bold">Upload Resumes</h1>

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
        className="px-4 py-2 bg-green-400 text-black font-semibold rounded hover:bg-green-300 hover:cursor-pointer w-full"
      >
        Select PDFs
      </button>

      {/* Display selected file names */}
      {selectedFiles.length > 0 && (
        <ul className="text-sm text-gray-700 mt-2">
          {selectedFiles.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
