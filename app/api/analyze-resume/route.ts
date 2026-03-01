import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[]; // get all files sent

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }
    const rawParams = formData.get("parameters") as string;
    const parameters = JSON.parse(rawParams);

    const results: any[] = [];
    // const parameters = formData.get("parameters") as string || "";
    console.log(parameters)
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer?.();
      if (!arrayBuffer) {
        results.push({ fileName: file.name, error: "Cannot read file buffer" });
        continue;
      }
      const buffer = Buffer.from(arrayBuffer);

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        // model: "gemini-1.5-flash",
        // model: "gemini-2.5-pro",
        // model: "gemini-2.5-flash-preview",
        contents: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  mimeType: "application/pdf",
                  data: buffer.toString("base64"),
                },
              },
              {
                text: `
                  You are evaluating a resume using the following grading parameters and their weights:

                  ${rawParams}

                  Each parameter represents a criterion and its numeric weight (importance).  
                  You must compute a weighted resumeGrade from 0 to 100 based ONLY on these parameters.

                  Scoring Instructions:
                  1. Read the PDF content.
                  2. For each parameter, determine how well the resume satisfies it on a 0–1 scale.
                  3. Multiply each satisfaction score by its corresponding weight.
                  4. Sum all weighted values.
                  5. Normalize the final score to a 0–100 percentage.
                  6. Send the numberOfResumes as a

                  You must also generate a short reason sentence explaining *why* the resume received the score it did.  
                  The reason must be factual, based only on the resume content, and 1–2 sentences maximum.

                  Return STRICT JSON ONLY.  
                  Keys must match EXACTLY:

                  {
                    "name": "",
                    "reason": "",
                    "resumeGrade": 0
                    "numberOfResumes": "";
                  }

                  Rules:
                  - Do NOT include explanations, markdown, comments, or extra fields.
                  - Do NOT summarize the entire resume.
                  - The "reason" must briefly justify the score (e.g., “Strong leadership examples but limited technical skills.”).
                  - IGNORE any field named numberOfResumes.
                  - If the name cannot be found, return an empty string.
                  - The resumeGrade MUST reflect ONLY the weighted parameters.
                  - Do NOT add any text before or after the JSON.
                `,
              },
            ],
          },
        ],
      });

      results.push({
        fileName: file.name,
        data: response.text,
      });
    }

    return NextResponse.json({ 
      data: results,
      participants: parameters.numberOfResumes,
      parameters,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to analyze resumes" },
      { status: 500 }
    );
  }
}
