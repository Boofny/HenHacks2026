import { create } from "zustand";

interface ResultsState {
  results: any[];
  participants: string;
  parameters: any | null;

  setResults: (r: any[]) => void;
  setParticipants: (p: string) => void;
  setParameters: (params: any) => void;
}

export const useResultsStore = create<ResultsState>((set) => ({
  results: [],
  participants: "",
  parameters: null,

  setResults: (results) => set({ results }),
  setParticipants: (participants) => set({ participants }),
  setParameters: (parameters) => set({ parameters }),
}));
