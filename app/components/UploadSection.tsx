"use client";

export default function UploadSection() {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-medium mb-4">Upload Resumes</h2>
      <input
        type="file"
        multiple
        accept="application/pdf"
        className="border border-gray-300 rounded-md p-2"
      />
      <p className="text-foreground text-sm mt-2">PDF files only</p>
    </div>
  );
}