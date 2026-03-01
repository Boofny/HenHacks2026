"use client";

type Resume = {
  id: number;
  name: string;
  leadership: number;
  experience: number;
  education: number;
  hardskills: number;
  totalScore: number;
};

export default function ResultsPage() {
  // 🔹 Example incoming data (replace with your real data source)
  const candidateData: string[][] = [
    ["John Doe", "8", "7", "9", "6"],
    ["Jane Smith", "9", "8", "8", "9"],
    ["Alex Brown", "6", "7", "6", "7"],
  ];

  const topCountArray: number[] = [2]; // show top 2 candidates

  // 🔹 Convert string arrays into Resume objects
  const gradedResumes: Resume[] = candidateData.map(
    (candidate, index) => {
      const name = candidate[0];
      const leadership = parseFloat(candidate[1]);
      const experience = parseFloat(candidate[2]);
      const education = parseFloat(candidate[3]);
      const hardskills = parseFloat(candidate[4]);

      const totalScore =
        (leadership + experience + education + hardskills) / 4;

      return {
        id: index + 1,
        name,
        leadership,
        experience,
        education,
        hardskills,
        totalScore,
      };
    }
  );

  // 🔹 Extract how many to show
  const topCount =
    topCountArray.length > 0
      ? Math.min(topCountArray[0], gradedResumes.length)
      : gradedResumes.length;

  const topResumes = [...gradedResumes]
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, topCount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white p-8">
      <h2 className="text-3xl font-bold mb-8">
        Top {topCount} Candidates
      </h2>

      {topResumes.length === 0 ? (
        <p className="text-gray-400">No candidates found.</p>
      ) : (
        topResumes.map((resume, index) => {
          const scoreOutOf100 = Math.round(resume.totalScore * 10);

          return (
            <div
              key={resume.id}
              className="border border-gray-600 rounded-xl p-6 mb-6 bg-gray-900 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">
                #{index + 1} – {resume.name}
              </h3>

              <p className="mb-3 text-lg">
                Candidate Score:
                <span className="font-bold text-green-400 ml-2">
                  {scoreOutOf100}/100
                </span>
              </p>

              <div className="text-gray-300 space-y-1">
                <p>Leadership: {resume.leadership}</p>
                <p>Experience: {resume.experience}</p>
                <p>Education: {resume.education}</p>
                <p>Hard Skills: {resume.hardskills}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
