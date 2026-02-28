
/*
import Link from "next/link";

export type ResumeResult = {
    fileName: string;
    finalScore: number;      // 0–100 or 0–1 depending on backend
    confidence: number;      // 0–1 or %
    reasoning?: string;      // optional short explanation
  };

const sampleResults: ResumeResult[] = [
    { fileName: "Alice_Johnson.pdf", finalScore: 95, confidence: 0.97, reasoning: "Strong leadership experience" },
    { fileName: "Bob_Smith.pdf", finalScore: 88, confidence: 0.92, reasoning: "Good technical skills, moderate leadership" },
    { fileName: "Carol_Lee.pdf", finalScore: 80, confidence: 0.85, reasoning: "Strong experience but less leadership" },
  ];

export default function ResultsPage() {
  const results = sampleResults; // replace with fetched API results later

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-8 text-gray-900">Graded Resumes</h1>

      <div className="w-full max-w-5xl grid gap-6">
        {results.map((r, index) => (
          <div
            key={r.fileName}
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-gray-900">
                {index + 1}. {r.fileName}
              </h2>
              <span className="text-gray-700 font-medium">
                Score: {r.finalScore} / Confidence: {(r.confidence * 100).toFixed(0)}%
              </span>
            </div>
            {r.reasoning && (
              <p className="text-gray-700 text-sm">{r.reasoning}</p>
            )}
          </div>
        ))}
      </div>

      <Link href="/" className="mt-8 px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition">
        Back
      </Link>
    </div>
  );
}
*/