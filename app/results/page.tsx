


type Resume = {
  id: number;
  name: string;
  leadership: number;
  experience: number;
  education: number;
  totalScore: number;
};

export default function ResultsPage() {

  const gradedResumes: Resume[] = [
    {
      id: 1,
      name: "John Smith",
      leadership: 8,
      experience: 9,
      education: 7,
      totalScore: 8.3
    },
    {
      id: 2,
      name: "Jane Doe",
      leadership: 9,
      experience: 7,
      education: 8,
      totalScore: 8.6
    },
    {
      id: 3,
      name: "Alex Brown",
      leadership: 6,
      experience: 8,
      education: 7,
      totalScore: 7.4
    }
  ];

  const resultsCount = 3;

  const topResumes = [...gradedResumes]
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, resultsCount);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-3xl font-bold mb-8">
        Top {resultsCount} Candidates
      </h2>

      {topResumes.map((resume, index) => {
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
              Total Score:
              <span className="font-bold text-green-400 ml-2">
                {scoreOutOf100}/100
              </span>
            </p>

            <div className="text-gray-300 space-y-1">
              <p>Leadership: {resume.leadership}</p>
              <p>Experience: {resume.experience}</p>
              <p>Education: {resume.education}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
