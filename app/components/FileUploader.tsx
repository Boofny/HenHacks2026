// "use client";
//
// import { useRef } from "react";
//
// export default function FileUploader({
//   files,
//   setFiles,
// }: {
//   files: File[];
//   setFiles: (files: File[]) => void;
// }) {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//
//   const handleButtonClick = () => {
//     fileInputRef.current?.click();
//   };
//
//   const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles(Array.from(e.target.files));
//     }
//   };
//
//   return (
//     <>
//       <input
//         type="file"
//         accept="application/pdf"
//         multiple
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleFiles}
//       />
//
//       <button
//         onClick={handleButtonClick}
//         className="px-4 py-2 bg-blue-600 text-white rounded"
//       >
//         Select PDFs
//       </button>
//     </>
//   );
// }
//
// "use client";
//
// import { useRef } from "react";
// import { setFiles } from "../lib/fileStore";
//
// export default function FileUploader() {
//   const ref = useRef<HTMLInputElement>(null);
//
//   const handleClick = () => {
//     ref.current?.click();
//   };
//
//   const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles(Array.from(e.target.files)); // 🔥 send files globally
//     }
//   };
//
//   return (
//     <>
//       <input
//         type="file"
//         accept="application/pdf"
//         multiple
//         hidden
//         ref={ref}
//         onChange={handleFiles}
//       />
//
//       <button onClick={handleClick}>
//         Select PDFs
//       </button>
//     </>
//   );
// }
//

