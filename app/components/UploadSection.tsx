"use client";

export default function UploadSection() {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-medium mb-4">Upload Resumes</h2>
      <input
        type="file"
        multiple
        accept="application/pdf"
        className="border border-gray-300 rounded-md p-2"
      />
      <p className="text-foreground text-sm mt-2">PDF files only</p>
    </div>
  );
}
//
//
// "use client";
//
// import { useRef, useState } from "react";
//
// export default function UploadSection() {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [files, setFiles] = useState<File[]>([]);
//   const [results, setResults] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//
//   // Trigger file input
//   const handleButtonClick = () => {
//     fileInputRef.current?.click();
//   };
//
//   // Handle file selection
//   const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles(Array.from(e.target.files));
//     }
//   };
//
//   // Upload files to backend
//   const handleUpload = async () => {
//     if (files.length === 0) return;
//
//     setLoading(true);
//     setError(null);
//     setResults([]);
//
//     try {
//       const formData = new FormData();
//       files.forEach((file) => formData.append("files", file));
//
//       const res = await fetch("/api/analyze-resume", {
//         method: "POST",
//         body: formData,
//       });
//
//       const data = await res.json();
//
//       if (!res.ok) {
//         setError(data.error || "Something went wrong");
//       } else {
//         setResults(data.data || []); // expect array of { fileName, data }
//       }
//     } catch (err: any) {
//       setError(err.message || "Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className="p-4 space-y-4 w-full">
//       <h1 className="text-lg font-bold">Upload Resumes</h1>
//
//       {/* Hidden input */}
//       <input
//         type="file"
//         accept="application/pdf"
//         multiple
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleFiles}
//       />
//
//       {/* Button to select files */}
//       <button
//         onClick={handleButtonClick}
//         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//       >
//         Select PDFs
//       </button>
//
//       {/* Upload button */}
//       <button
//         onClick={handleUpload}
//         disabled={files.length === 0 || loading}
//         className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50 hover:bg-green-700"
//       >
//         {loading ? "Processing..." : "Upload & Analyze"}
//       </button>
//
//       {/* Show selected files */}
//       {files.length > 0 && (
//         <ul className="text-sm text-gray-700">
//           {files.map((file) => (
//             <li key={file.name}>{file.name}</li>
//           ))}
//         </ul>
//       )}
//
//       {/* Show error */}
//       {error && <p className="text-red-500">{error}</p>}
//
//       {/* Show results */}
//       {results.length > 0 && (
//         <div className="mt-4 space-y-2">
//           {results.map((r, idx) => (
//             <div
//               key={idx}
//               className="p-2 border rounded bg-gray-50 dark:bg-gray-900 text-white"
//             >
//               <h2 className="font-semibold">{r.fileName}</h2>
//               {/* <pre className="whitespace-pre-wrap">{JSON.stringify(r.data, null, 2)}</pre> */}
//               <pre>{r.data ? JSON.stringify(r.data, null, 2) : r.error}</pre>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
