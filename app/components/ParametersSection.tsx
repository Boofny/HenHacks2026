"use client";

export default function ParametersSection() {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-medium mb-4">Evaluation Parameters</h2>

      <label className="flex flex-col mb-4 text-sm">
        Leadership Weight
        <input
          type="number"
          step="0.1"
          defaultValue={0.3}
          className="border border-gray-300 rounded-md p-2 mt-1"
        />
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
    </div>
  );
}