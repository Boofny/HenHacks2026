"use client";

import { useResultsStore } from "../store/resultsStore";

type Resume = {
  id: number;
  name: string;
  reason: string;
  totalScore: number;
};

export default function ResultsPage() {
  const results = useResultsStore((s) => s.results);
  const participants = useResultsStore((s) => s.participants);
  const parameters = useResultsStore((s) => s.parameters);

  if (!results.length) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h2 className="text-2xl">No results found</h2>
      </div>
    );
  }

  const gradedResumes: Resume[] = results.map((r, index) => {
    const parsed =
      typeof r.data === "string" ? JSON.parse(r.data) : r.data;

    return {
      id: index + 1,
      name: parsed.name || "Unknown",
      reason: parsed.reason || "N/A",
      totalScore: (parsed.resumeGrade ?? 0) / 10,
    };
  });

  // Prefer numberOfResumes from parameters (user's "top N") when API didn't return it
  let parsedParticipants = Number(participants);
  if (typeof parameters === "string" && (isNaN(parsedParticipants) || parsedParticipants <= 0)) {
    const match = parameters.match(/numberOfResumes:\s*(\d+)/i);
    if (match) parsedParticipants = parseInt(match[1], 10);
  }

  const topCount =
    !isNaN(parsedParticipants) && parsedParticipants > 0
      ? Math.min(parsedParticipants, gradedResumes.length)
      : gradedResumes.length;

  const topResumes = [...gradedResumes]
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, topCount);

  return (
    <div className="min-h-screen bg-green-300 text-black p-8">
      <h2 className="text-3xl font-bold mb-8">
        Top {topCount} Candidates
      </h2>

      {topResumes.map((resume, index) => {
        const scoreOutOf100 = Math.round(resume.totalScore * 10);

        return (
          <div
            key={resume.id}
            className="border-6 border-gray-600 rounded-xl p-6 mb-6 bg-white shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">
              #{index + 1} – {resume.name}
            </h3>

            <p className="mb-3 text-lg">
              Total Score:
              <span className="font-bold text-green-600 ml-2">
                {scoreOutOf100}/100
              </span>
            </p>

            <p className="text-black">
              Reason: {resume.reason}
            </p>
          </div>
        );
      })}
    </div>
  );
}
