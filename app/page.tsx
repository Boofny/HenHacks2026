import Image from "next/image";
import "./globals.css";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-8">
      <div className="bg-white w-full max-w-5xl p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold mb-10">Active Resume Grader</h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Upload Section */}
          <div className="flex flex-col">
            <h2 className="text-xl font-medium mb-4">Upload Resumes</h2>
            <p className = "text-sm text-gray-600 mb-4">
              Upload one or more PDF resumes to evalute candidates based on 
              customizable leadership, technical skills, experience, and education 
              weights.
            </p>


            <input
              type="file"
              multiple
              accept="application/pdf"
              className="border border-gray-300 rounded-md p-2"
            />
            <p className="text-foreground text-sm mt-2">PDF files only</p>
          </div>

          {/* Parameters Section */}
          <div className="flex flex-col">
            <h2 className="text-xl font-medium mb-4">Evaluation Parameters</h2>

            <label className="flex group flex-col mb-4 text-sm">
              Leadership Weight
              <input
                type="number"
                step="0.1"
                defaultValue={0.3}
                className="border border-gray-300 rounded-md p-2 mt-1"
              />

              <span 
                className="absolute left-0 -bottom-6 text-xs text-gray-500 opacity-0 
                group-hover:opacity-100 transition-opacity duration-200"
              >
                Enter your preference for Leadership weight
              </span>
            </label>

            <label className="flex flex-col mb-4 text-sm">
              Technical Skills Weight
              <input
                type="number"
                step="0.1"
                defaultValue={0.3}
                className="border border-gray-300 rounded-md p-2 mt-1"
              />
            </label>

            <label className="flex flex-col mb-4 text-sm">
              Experience Weight
              <input
                type="number"
                step="0.1"
                defaultValue={0.2}
                className="border border-gray-300 rounded-md p-2 mt-1"
              />
            </label>

            <label className="flex flex-col mb-4 text-sm">
              Education Weight
              <input
                type="number"
                step="0.1"
                defaultValue={0.2}
                className="border border-gray-300 rounded-md p-2 mt-1"
              />
            </label>

            <label className="flex flex-col mb-4 text-sm">
              Number of Resumes to Return
              <input
                type="number"
                defaultValue={5}
                className="border border-gray-300 rounded-md p-2 mt-1"
              />
            </label>

            <button className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition">
              Grade Resumes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
