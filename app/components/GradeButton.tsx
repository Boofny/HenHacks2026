"use client";

import { useState, useEffect } from "react";
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

   // simple dot animation: 0 → 1 → 2 → 3 → 2 → 1 → ...
  const dotSequence = [0, 1, 2, 3, 2, 1];
  const [dotStep, setDotStep] = useState(0);

  useEffect(() => {
    if (!loading) {
      setDotStep(0);
      return;
    }

    const interval = setInterval(() => {
      setDotStep((prev) => (prev + 1) % dotSequence.length);
    }, 300);

    return () => clearInterval(interval);
  }, [loading, dotSequence.length]);

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

  const dots = ".".repeat(dotSequence[dotStep]);
  const buttonLabel = loading ? `Processing${dots}` : "Analyze";

  return (
    <div className="space-y-3">
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="bg-green-400 h-10 px-4 text-black font-semibold rounded hover:bg-green-300 w-full hover:cursor-pointer"
      >
        {buttonLabel}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
