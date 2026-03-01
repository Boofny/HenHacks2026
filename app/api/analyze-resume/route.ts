import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "nodejs";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
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
                 Extract ONLY the following fields from this PDF and return STRICT JSON:
                  {
                    "name": "",
                    "email": "",
                    "skills": [],
                    "years_experience": number,
                    "grade": number,
                    "reason": ""
                  }
                  Do NOT include any other sections, text, or formatting.
                  Return JSON only, no explanations, no markdown.
              `,
            },

          ],
        },
      ],
    });

    return NextResponse.json({
      data: response.text,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to analyze resume" },
      { status: 500 }
    );
  }
}
