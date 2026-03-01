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

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$






// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenAI } from "@google/genai";
//
// export const runtime = "nodejs";
//
// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY!,
// });
//
// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const files = formData.getAll("files") as any[];
//
//     if (!files || files.length === 0) {
//       return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
//     }
//
//     const results: any[] = [];
//
//     for (const file of files) {
//       // Node.js-safe conversion
//       let buffer: Buffer;
//       if ("arrayBuffer" in file && typeof file.arrayBuffer === "function") {
//         buffer = Buffer.from(await file.arrayBuffer());
//       } else {
//         results.push({ fileName: file.name, error: "Cannot read file buffer" });
//         continue;
//       }
//
//       try {
//         const response = await ai.models.generateContent({
//           model: "gemini-2.5-flash",
//           contents: [
//             {
//               role: "user",
//               parts: [
//                 {
//                   inlineData: {
//                     mimeType: "application/pdf",
//                     data: buffer.toString("base64"),
//                   },
//                 },
//                 {
//                   text: `
//                     Extract ONLY the following fields from this PDF and return STRICT JSON:
//                     {
//                       "name": "",
//                       "resumeGrade": number
//                     }
//                     Do NOT include any other sections, text, or formatting.
//                     Return JSON only, no explanations, no markdown.
//                   `,
//                 },
//               ],
//             },
//           ],
//         });
//
//         results.push({ fileName: file.name, data: response.text });
//       } catch (err) {
//         console.error("AI generation failed for file:", file.name, err);
//         results.push({ fileName: file.name, error: "AI generation failed" });
//       }
//
//       // Optional delay to avoid rate limits
//       await new Promise((res) => setTimeout(res, 300));
//     }
//
//     return NextResponse.json({ data: results });
//   } catch (err) {
//     console.error("Server error:", err);
//     return NextResponse.json(
//       { error: "Failed to analyze resumes" },
//       { status: 500 }
//     );
//   }
// }
//
// import { NextRequest, NextResponse } from "next/server";
// import { GoogleGenAI } from "@google/genai";
//
// export const runtime = "nodejs";
//
// const ai = new GoogleGenAI({
//   apiKey: process.env.GEMINI_API_KEY!,
// });
//
// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const files = formData.getAll("files") as File[];
//
//     if (!files.length) {
//       return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
//     }
//
//     const results = [];
//
//     for (const file of files) {
//       const fileName = file.name ?? "uploaded.pdf";
//
//       let buffer: Buffer;
//       try {
//         buffer = Buffer.from(await file.arrayBuffer());
//       } catch {
//         results.push({ fileName, error: "Cannot read file buffer" });
//         continue;
//       }
//
//       try {
//         const response = await ai.models.generateContent({
//           model: "gemini-1.5-flash",
//           contents: [
//             {
//               role: "user",
//               parts: [
//                 {
//                   inlineData: {
//                     mimeType: "application/pdf",
//                     data: buffer.toString("base64"),
//                   },
//                 },
//                 {
//                   text: `
//                     Extract ONLY:
//                     {
//                       "name": "",
//                       "resumeGrade": number
//                     }
//                     Return STRICT JSON only.
//                   `,
//                 },
//               ],
//             },
//           ],
//         });
//
//         const text =
//           response.candidates?.[0]?.content?.parts?.[0]?.text || "";
//
//         let parsed;
//         try {
//           parsed = JSON.parse(text);
//         } catch {
//           parsed = { rawText: text };
//         }
//
//         results.push({ fileName, data: parsed });
//       } catch (err) {
//         results.push({ fileName, error: "AI generation failed" });
//       }
//     }
//
//     return NextResponse.json({ data: results });
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Failed to analyze resumes" },
//       { status: 500 }
//     );
//   }
// }
