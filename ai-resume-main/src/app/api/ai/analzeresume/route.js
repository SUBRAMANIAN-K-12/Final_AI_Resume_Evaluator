import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
export async function POST(req) {
  try {
    const resumeData = await req.json(); // Get the resume data from the request body
    // Define the schema for resume analysis, now including grammar and ATS compatibility
    const schema = z.object({
      analysis: z.array(
        z.object({
          fieldName: z.string(),
          score: z.number().min(0).max(100),
          suggestions: z.string(),
        })
      ),
      grammar: z.object({
        score: z.number().min(0).max(100),
        suggestions: z.string(),
      }),
      atsCompatibility: z.object({
        score: z.number().min(0).max(100),
        suggestions: z.string(),
      }),
    });
    // Construct the prompt for the AI model, now asking for grammar and ATS compatibility
    const prompt = `
      Analyze this resume:
      for each field provide:
      1. The field name.
      2. The score out of 100.
      3. Any optimization suggestions for that field atleast 3 lines.

    For ATS Compatibility;
      Analyze this resume for compatibility with an Applicant Tracking System (ATS). The analysis should be based on the following ATS evaluation criteria:
  
  1. **Keyword Optimization** (Relevance & Frequency): Evaluate whether the resume includes industry-specific keywords related to the job role. Assess the effectiveness of keyword distribution and suggest missing or weak keywords.
  2. **Formatting & Readability**: Check if the resume follows ATS-friendly formatting. Ensure it avoids elements that can cause parsing errors (e.g., tables, columns, images, fancy fonts). Highlight any problematic formatting issues.
  3. **Section Structuring & Clarity**: Analyze whether key resume sections (e.g., Contact Information, Summary, Work Experience, Skills, Education) are clearly labeled and properly structured for ATS parsing.
  4. **Information Consistency & Accuracy**: Validate if job titles, dates, and company names are consistently formatted and correctly structured. Identify any discrepancies or inconsistencies. 
  5. **File Type & Naming Conventions**: Determine if the file format is ATS-compatible (e.g., .docx or .pdf). Check for appropriate file naming conventions.
  6. **Contact Information & Links**: Verify that contact details (email, phone, LinkedIn) are correctly formatted and accessible to ATS.
  7. **Grammar & Language Quality**: Analyze the resume for grammatical errors, typos, and clarity of writing. Provide suggestions to improve readability and professionalism.

      Resume Data:
      ${JSON.stringify(resumeData, null, 2)}
    `;
    // Call the AI model with generateObject and pass the schema
    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema,
      prompt,
    });

    // Return the analysis result
    return NextResponse.json({ data: object }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to analyze resume" },
      { status: 500 }
    );
  }
}
