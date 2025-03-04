import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export async function POST(req) {
 
  try {
    const body = await req.json();
    const { extractedText, jobDescription } = body;

    if (!extractedText || !jobDescription) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // AI Model Prompt
    const prompt = `
      Compare the resume with the job description and provide an in-depth analysis.

      The analysis should include:

      1. **Field-wise Comparison**:
         - For each key field in the resume (such as "Experience", "Skills", "Internships", "Projects"), provide:
           - **Field Name**
           - **Score (out of 100)** reflecting how well the resume matches the job description.
           - **Optimization suggestions** for improvement.
          

      2. **Grammar & Language Quality**:
         - Provide a grammar analysis with a **score out of 100**.
         - Highlight grammatical errors and provide suggestions.

      3. **ATS (Applicant Tracking System) Compatibility**:
         - Analyze the resume based on **keyword relevance, formatting, readability**.
         - Provide an **ATS compatibility score out of 100**.
         - Offer recommendations for improvement.

      4. **Overall Match Percentage**:
         - Calculate the total match percentage.
         - Provide final insights on areas of improvement.

      5. **Final Resume Improvements**:
         - Provide a summary of all improvements needed to make the resume stronger.
         - List missing skills(mention exact skills and technologies he/she  need to improve), qualifications, certifications, and areas for improvement in detail for every field.

      Resume:
      ${JSON.stringify(extractedText, null, 2)}

      Job Description:
      ${JSON.stringify(jobDescription, null, 2)}
    `;

    // Define AI Response Schema
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
      overallMatch: z.number().min(0).max(100),
      improvements: z.string(), 
    });

    // Generate the AI response
    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema,
      prompt,
    });


    return NextResponse.json(object, { status: 200 });
  } catch (error) {
    console.error("Error in job analysis API:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume against job description" },
      { status: 500 }
    );
  }
}
