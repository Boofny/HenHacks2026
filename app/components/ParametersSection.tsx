"use client";
import { useState } from "react";

type Parameters = {
  leadershipWeight: string;
  leadershipAdvanced: string;
  experienceWeight: string;
  experienceInYears: string;
  experienceAdvanced: string;
  hardSkillsWeight: string;
  hardSkillsAdvanced: string;
  educationWeight: string;
  GPA: string;
  nameOfUniversity: string;
  corseWork:string;
  numberOfResumes: string;
};

interface ParametersSectionProps {
  setParamsString: (val: string) => void;
}

export default function ParametersSection({ setParamsString }: ParametersSectionProps) {
  const [parameters, setParameters] = useState<Parameters>({
    leadershipWeight: "",
    leadershipAdvanced: "",
    experienceWeight: "",
    experienceInYears: "",
    experienceAdvanced: "",
    hardSkillsWeight: "",
    hardSkillsAdvanced: "",
    educationWeight: "",
    GPA: "",
    nameOfUniversity: "",
    corseWork: "",
    numberOfResumes: "",
  });

  const [showLeadershipAdvanced, setShowLeadershipAdvanced] = useState(false);
  const [showExperencesAdvanced, setShowExperencesAdvanced] = useState(false);
  const [showHardSkillsAdvanced, setShowHardSkillsAdvanced] = useState(false);
  const [showEducationAdvanced, setShowEducationAdvanced] = useState(false);
  const [saved, setSaved] = useState(false);

  // Build an array of strings from all parameter values
  const handleBuildStrings = () => {
    // Converts the object into a readable string format for the AI
    const stringsArray = Object.entries(parameters)
      .filter(([_, value]) => value !== "") 
      .map(([key, value]) => `${key}: ${value}`);
    
    const finalString = stringsArray.join("\n");
    setParamsString(finalString); // Sends data to page.tsx

    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
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
          placeholder="0.0"
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
          placeholder="0.0"
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
              value={parameters.experienceInYears}
              onChange={(e) =>
                setParameters((prev) => ({
                  ...prev,
                  experienceInYears: e.target.value,
            }))
          }
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

      {/* Hard Skills */}
      <div className="flex flex-col mb-4 text-sm">
        <label
          onClick={() => setShowHardSkillsAdvanced(!showHardSkillsAdvanced)}
          className="cursor-pointer font-medium flex justify-between"
        >
          Hard Skills Weight
          <span>{showHardSkillsAdvanced ? "▲" : "▼"}</span>
        </label>
        <input
          type="number"
          step="0.1"
          placeholder="0.0"
          value={parameters.hardSkillsWeight}
          onChange={(e) =>
            setParameters((prev) => ({ ...prev, hardSkillsWeight: e.target.value }))
          }
          className="border border-gray-300 rounded-md p-2 mt-1"
        />

        {showHardSkillsAdvanced && (
          <textarea
            placeholder="Enter advanced hard skills criteria...(ex: React, Python, SQL)"
            value={parameters.hardSkillsAdvanced}
            onChange={(e) =>
              setParameters((prev) => ({ ...prev, hardSkillsAdvanced: e.target.value }))
            }
            className="border border-gray-300 rounded-md p-2 mt-2"
          />
        )}
      </div>

      {/* Education */}
      <div className="flex flex-col mb-4 text-sm">
        <label
          onClick={() => setShowEducationAdvanced(!showEducationAdvanced)}
          className="cursor-pointer font-medium flex justify-between"
        >
          Education Weight
          <span>{showEducationAdvanced ? "▲" : "▼"}</span>
        </label>
        <input
          type="number"
          step="0.1"
          placeholder="0.0"
          value={parameters.educationWeight}
          onChange={(e) =>
            setParameters((prev) => ({ ...prev, educationWeight: e.target.value }))
          }
          className="border border-gray-300 rounded-md p-2 mt-1"
        />

        {showEducationAdvanced && (
          <div className="flex flex-col gap-2 mt-2">
            <input
              type="text"
              placeholder="GPA"
              value={parameters.GPA}
              onChange={(e) =>
                setParameters((prev) => ({ ...prev, GPA: e.target.value }))
              }
              className="border border-gray-300 rounded-md p-2"
            />
            <textarea
              placeholder="Name of University"
              value={parameters.nameOfUniversity}
              onChange={(e) =>
                setParameters((prev) => ({ ...prev, nameOfUniversity: e.target.value }))
              }
              className="border border-gray-300 rounded-md p-2"
            />
            <textarea
              placeholder="Relevant Coursework"
              value={parameters.corseWork}
              onChange={(e) =>
                setParameters((prev) => ({ ...prev, courseWork: e.target.value }))
              }
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
        )}
      </div>

      <label className="flex flex-col mb-4 text-sm">
        Number of Resumes to Return
        <input
          type="number"
          placeholder="Number of filtered resumes to return"
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
        className="hover:cursor-pointer mt-4 mb-4 px-2.5 py-2 bg-green-400 text-black font-semibold rounded hover:bg-green-300 transition"
      >
        {saved ? "Parameters Saved" : "Save Parameters"}
      </button>
    </div>
  );
}
