// "use client";
//
// import { useRouter } from "next/navigation";
//
// export default function GradeButton() {
//   const router = useRouter();
//
//   const handleGradeClick = () => {
//     router.push("/results"); // navigate to results page
//   };
//
//   return (
//     <div className="flex flex-col mb-4 text-sm">
//       <button
//         onClick={handleGradeClick}
//         className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition"
//       >
//         Grade Resumes
//       </button>
//     </div>
//   );
// }
// "use client";
//
// interface ProcessButtonProps {
//   files: File[];
//   setResults: React.Dispatch<React.SetStateAction<any[]>>;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   setError: React.Dispatch<React.SetStateAction<string | null>>;
//   loading: boolean;
// }
//
// export default function GradeButton({
//   files,
//   setResults,
//   setLoading,
//   setError,
//   loading,
// }: ProcessButtonProps) {
//   const handleUpload = async () => {
//     // if (files.length === 0) return;
//     if (!files?.length) return;
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
//         setResults(data.data || []);
//       }
//     } catch (err: any) {
//       setError(err.message || "Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <button
//       onClick={handleUpload}
//       // disabled={files.length === 0 || loading}
//       className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
//     >
//       {loading ? "Processing..." : "Upload & Analyze"}
//     </button>
//   );
// }
//
// "use client";
//
// import { useState } from "react";
// import { getFiles } from "../lib/fileStore";
//
// export default function AnalyzeButton() {
//   const [loading, setLoading] = useState(false);
//
//   const handleAnalyze = async () => {
//     const files = getFiles(); 
//
//     if (!files.length) return;
//
//     setLoading(true);
//
//     const formData = new FormData();
//     files.forEach((file) => formData.append("files", file));
//
//     await fetch("/api/analyze-resume", {
//       method: "POST",
//       body: formData,
//     });
//
//     setLoading(false);
//   };
//
//   return (
//     <button onClick={handleAnalyze} disabled={loading} className="bg-green-300 h-10 rounded hover:bg-green-500">
//
//       {loading ? "Processing..." : "Analyze"}
//     </button>
//   );
// }

// "use client";
//
// import { useState } from "react";
// import { getFiles } from "../lib/fileStore";
// import { useRouter } from "next/navigation";
// import { useResultsStore } from "../store/resultsStore";
//
// interface AnalyzeButtonProps {
//   paramsString: string;
// }
//
// export default function AnalyzeButton({ paramsString }: AnalyzeButtonProps) {
//   const [loading, setLoading] = useState(false);
//   const [results, setResults] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);
//
//   const handleAnalyze = async () => {
//     const setParticipants = useResultsStore((s) => s.setParticipants);
//     const setResultsGlobal = useResultsStore((s) => s.setResults);
//     const files = getFiles();
//     const router = useRouter();
//     if (!files.length) {
//       setError("No files selected");
//       return;
//     }
//
//     setLoading(true);
//     setError(null);
//     setResults([]);
//
//     try {
//       const formData = new FormData();
//       files.forEach((file) => formData.append("files", file));
//
//       formData.append("parameters", paramsString);
//
//       const res = await fetch("/api/analyze-resume", {
//         method: "POST",
//         body: formData,
//       });
//
//       const data = await res.json(); //read response
//
//       if (!res.ok) {
//         setError(data.error || "Something went wrong");
//       } else {
//         setResults(data.data || []); //store results
//         setParticipants(data.participants);    // store participants globally
//         router.push("/results"); 
//       }
//     } catch (err: any) {
//       setError(err.message || "Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };
//
//   return (
//     <div className="space-y-3">
//       <button
//         onClick={handleAnalyze}
//         disabled={loading}
//         className="bg-black h-10 px-4 text-white rounded hover:bg-gray-800 w-full hover:cursor-pointer"
//       >
//         {loading ? "Processing..." : "Analyze"}
//       </button>
//
//       {/* Error */}
//       {error && <p className="text-red-500">{error}</p>}
//
//       {/* Results */}
//       {results.length > 0 && (
//         <div className="space-y-2">
//           {results.map((r, idx) => (
//             <div key={idx} className="p-2 border rounded bg-gray-50 dark:bg-gray-900 text-white">
//               <h2 className="font-semibold">{r.fileName}</h2>
//               <pre>
//                 {r.data ? JSON.stringify(r.data, null, 2) : r.error}
//               </pre>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
//

"use client";

import { useState } from "react";
import { getFiles } from "../lib/fileStore";
import { useRouter } from "next/navigation";
import { useResultsStore } from "../store/resultsStore";

interface AnalyzeButtonProps {
  paramsString: string;
}

export default function AnalyzeButton({ paramsString }: AnalyzeButtonProps) {
  const router = useRouter();

  const setResultsGlobal = useResultsStore((s) => s.setResults);
  const setParticipants = useResultsStore((s) => s.setParticipants);
  const setParameters = useResultsStore((s) => s.setParameters);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    const files = getFiles();

    if (!files.length) {
      setError("No files selected");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      formData.append("parameters", JSON.stringify(paramsString));

      const res = await fetch("/api/analyze-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        // Store globally
        setResultsGlobal(data.data);
        setParticipants(data.participants);
        setParameters(data.parameters);
        useResultsStore.getState().setParameters(data.parameters);

        // Redirect to results page
        router.push("/results");
      }
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-green-400 h-10 px-4 text-black font-semibold rounded hover:bg-green-300 w-full hover:cursor-pointer"
      >
        {loading ? "Processing..." : "Analyze"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
