"use client";
import { useState } from "react";

type Parameters = {
  leadershipWeight: string;
  leadershipAdvanced: string;
  experienceWeight: string;
  experienceAdvanced: string;
  technicalSkills: string;
  education: string;
  numberOfResumes: string;
};

export default function ParametersSection() {
  const [parameters, setParameters] = useState<Parameters>({
    leadershipWeight: "0.3",
    leadershipAdvanced: "",
    experienceWeight: "0.3",
    experienceAdvanced: "",
    technicalSkills: "0.3",
    education: "0.2",
    numberOfResumes: "5",
  });

  const [showLeadershipAdvanced, setShowLeadershipAdvanced] = useState(false);
  const [showExperencesAdvanced, setShowExperencesAdvanced] = useState(false);

  // Build an array of strings from all parameter values
  const handleBuildStrings = () => {
    const stringsArray = Object.entries(parameters).map(
      ([key, value]) => `${key}: ${value}`
    );
    console.log(stringsArray);
    alert(stringsArray.join("\n"));
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-medium mb-4">Evaluation Parameters</h2>

      {/* Leadership */}
      <div className="flex flex-col mb-4 text-sm">
        <label
          onClick={() => setShowLeadershipAdvanced(!showLeadershipAdvanced)}
          className="cursor-pointer font-medium flex justify-between"
        >
          Leadership Weight
          <span>{showLeadershipAdvanced ? "▲" : "▼"}</span>
        </label>
        <input
          type="number"
          step="0.1"
          value={parameters.leadershipWeight}
          onChange={(e) =>
            setParameters((prev) => ({
              ...prev,
              leadershipWeight: e.target.value,
            }))
          }
          className="border border-gray-300 rounded-md p-2 mt-1"
        />

        {showLeadershipAdvanced && (
          <textarea
            placeholder="Enter advanced leadership criteria...(ex President of a club)"
            value={parameters.leadershipAdvanced}
            onChange={(e) =>
              setParameters((prev) => ({
                ...prev,
                leadershipAdvanced: e.target.value,
              }))
            }
            className="border border-gray-300 rounded-md p-2 mt-2"
          />
        )}
      </div>

      {/* Experience */}
      <div className="flex flex-col mb-4 text-sm">
        <label
          onClick={() => setShowExperencesAdvanced(!showExperencesAdvanced)}
          className="cursor-pointer font-medium flex justify-between"
        >
          Experience Weight
          <span>{showExperencesAdvanced ? "▲" : "▼"}</span>
        </label>
        <input
          type="number"
          step="0.1"
          value={parameters.experienceWeight}
          onChange={(e) =>
            setParameters((prev) => ({
              ...prev,
              experienceWeight: e.target.value,
            }))
          }
          className="border border-gray-300 rounded-md p-2 mt-1"
        />

        {showExperencesAdvanced && (
          <div className="flex flex-col gap-2 mt-2">
            <input
              type="number"
              min="0"
              placeholder="Minimum years of prior experience"
              className="border border-gray-300 rounded-md p-2"
            />
            <textarea
              placeholder="Enter desired past job titles (ex: Software Engineer)"
              value={parameters.experienceAdvanced}
              onChange={(e) =>
                setParameters((prev) => ({
                  ...prev,
                  experienceAdvanced: e.target.value,
                }))
              }
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
        )}
      </div>

      {/* Other parameters */}
      <label className="flex flex-col mb-4 text-sm">
        Technical Skills Weight
        <input
          type="number"
          step="0.1"
          value={parameters.technicalSkills}
          onChange={(e) =>
            setParameters((prev) => ({
              ...prev,
              technicalSkills: e.target.value,
            }))
          }
          className="border border-gray-300 rounded-md p-2 mt-1"
        />
      </label>

      <label className="flex flex-col mb-4 text-sm">
        Education Weight
        <input
          type="number"
          step="0.1"
          value={parameters.education}
          onChange={(e) =>
            setParameters((prev) => ({ ...prev, education: e.target.value }))
          }
          className="border border-gray-300 rounded-md p-2 mt-1"
        />
      </label>

      <label className="flex flex-col mb-4 text-sm">
        Number of Resumes to Return
        <input
          type="number"
          value={parameters.numberOfResumes}
          onChange={(e) =>
            setParameters((prev) => ({
              ...prev,
              numberOfResumes: e.target.value,
            }))
          }
          className="border border-gray-300 rounded-md p-2 mt-1"
        />
      </label>

      {/* Button to build strings */}
      <button
        onClick={handleBuildStrings}
        className="mt-4 mb-4 px-2.5 py-2 bg-black text-white rounded hover:bg-gray-500 transition"
      >
        Save Parameters
      </button>
    </div>
  );
}
/*
export default function ParametersSection() {
  const [showLeadershipAdvanced, setShowLeadershipAdvanced] = useState(false);
  const [showExperencesAdvanced, setShowExperencesAdvanced] = useState(false);

  const handleBuildStrings = () => {
    const stringsArray = Object.entries(parameters).map(
      ([key, value]) => `${key}: ${value}`
    );
    console.log(stringsArray);
    alert(stringsArray.join("\n"));
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-medium mb-4">Evaluation Parameters</h2>

      <div className="flex flex-col mb-4 text-sm">
        <label
          onClick={() => setShowLeadershipAdvanced(!showLeadershipAdvanced)}
          className="cursor-pointer font-medium flex justify-between"
        >
          Leadership Weight
          <span>{showLeadershipAdvanced ? "▲" : "▼"}</span>
        </label>

        <input
          type="number"
          step="0.1"
          defaultValue={0.3}
          className="border border-gray-300 rounded-md p-2 mt-1"
        />

        {showLeadershipAdvanced && (
          <textarea
            placeholder="Enter advanced leadership criteria...(ex Presedant of a club)"
            className="border border-gray-300 rounded-md p-2 mt-2"
          />
        )}
      </div>

      <div className="flex flex-col mb-4 text-sm">
        <label
          onClick={() => setShowExperencesAdvanced(!showExperencesAdvanced)}
          className="cursor-pointer font-medium flex justify-between"
        >
          Experience Weight
          <span>{showExperencesAdvanced ? "▲" : "▼"}</span>
        </label>

        <input
          type="number"
          step="0.1"
          defaultValue={0.3}
          className="border border-gray-300 rounded-md p-2 mt-1"
        />

        {showExperencesAdvanced && (
          <div className="flex flex-col gap-2 mt-2">
            <input
            type="number"
            min="0"
            placeholder="Minimum years of prior experience"
            className="border border-gray-300 rounded-md p-2"
          />
          <textarea
            placeholder="Enter desired past job titles (ex: software Engineer)"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        )}
      </div>

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
    </div>
  );
}
*/