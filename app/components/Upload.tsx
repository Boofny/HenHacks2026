// // ./components/Upload.tsx
// "use client"; // MUST be first line
//
// import { useState } from "react";
//
// export default function Upload() {
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);
//
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       console.log("File selected:", e.target.files[0]);
//       setFile(e.target.files[0]);
//     }
//   };
//
//   const handleUpload = async () => {
//     console.log("Button clicked"); // debug line
//     if (!file) return;
//
//     setLoading(true);
//     setError(null);
//
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
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
//         setResult(data.data);
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
//       <h1 className="text-lg font-bold">Upload Resume</h1>
//
//       <input type="file" accept="application/pdf" onChange={handleFileChange} />
//
//       <button
//         onClick={handleUpload}
//         disabled={!file || loading}
//         className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:cursor-pointer"
//       >
//         {loading ? "Processing..." : "Upload & Analyze"}
//       </button>
//
//       {error && <p className="text-red-500">{error}</p>}
//
//       {result && (
//         <div className="mt-4 p-2 border rounded bg-gray-50 dark:bg-gray-900">
//           <h2 className="font-semibold">Result:</h2>
//           <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }
//
//
// "use client"
// import { useState } from "react";
//
// function Upload() {
//   const [files, setFiles] = useState<File[]>([]);
//   const [results, setResults] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//
//   const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       setFiles(Array.from(event.target.files));
//     }
//   };
//
//   const handleUpload = async () => {
//     if (files.length === 0) return;
//
//     setLoading(true);
//     const formData = new FormData();
//     files.forEach((file) => formData.append("files", file)); // note: use "files" key
//
//     try {
//       const res = await fetch("/api/analyze-resume", {
//         method: "POST",
//         body: formData,
//       });
//
//       const data = await res.json();
//       setResults(data.data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div>
//       <input type="file" accept="application/pdf" multiple onChange={handleFiles} />
//       <button onClick={handleUpload} disabled={loading}>
//         {loading ? "Processing..." : "Upload PDFs"}
//       </button>
//       <ul>
//         {results.map((r, idx) => (
//           <li key={idx}>
//             <pre>{JSON.stringify(r, null, 2)}</pre>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
//
// export default Upload;


"use client";

import { useRef, useState } from "react";

function UploadButton() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Ref to hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger file input when button is clicked
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // When files are selected
  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  // Upload files to backend
  const handleUpload = async () => {
    if (files.length === 0) return;

    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResults(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hidden file input */}
      <input
        type="file"
        accept="application/pdf"
        multiple
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFiles}
      />

      {/* Button triggers file input */}
      <button onClick={handleButtonClick}>
        Select PDFs
      </button>

      {/* Upload button */}
      <button onClick={handleUpload} disabled={loading || files.length === 0}>
        {loading ? "Processing..." : "Upload"}
      </button>

      {/* List selected files */}
      <ul>
        {files.map((file) => (
          <li key={file.name}>{file.name}</li>
        ))}
      </ul>

      {/* Display results */}
      <ul>
        {results.map((r, idx) => (
          <li key={idx}>
            <pre>{JSON.stringify(r, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UploadButton;
