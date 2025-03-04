import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

export async function POST(req) {
  try {
    const resumeData = await req.json();

    // Schema definition
    const schema = z.object({
      correctedResume: z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        mobileNumber: z.string(),
        dateOfBirth: z.string(),
       
        presentAddress: z.string(),
        profile: z.string(),
        branch: z.string(),
        college: z.string(),
        percentage: z.string(),
        passingYear: z.string(),
        skills: z.string(),
        technicalCertifications: z.string(),
        internshipCertifications: z.string(),
        yearsOfExperience: z.string(),
        experienceDetails: z.string(),
        linkedinProfile: z.string(),
        project: z.string(),
        projectDescription: z.string(),
        hobbies: z.string(),
      }),
    });

    // AI prompt
    const prompt = `
    The following is a user's resume data. Your task is to enhance its clarity, grammar, and overall professionalism.
  
    *Instructions:*
    - Correct any grammatical mistakes.
    - Enhance sentence structure while keeping the meaning intact.
    - If a field contains gibberish or meaningless content, replace it with "N/A".
    - Format phone numbers and emails properly.
    - Ensure proper capitalization (e.g., job titles, names, university names).
    - Keep technical terms and project names unchanged.
    - Ensure a professional tone.
  
    *For the "Profile" section:*
    - If a profile summary exists, refine it for better clarity and professionalism.
    - If empty or vague, generate a well-structured professional summary.
    - Understand the user's field based on *skills, internships, and experience* rather than listing projects explicitly.
    - Highlight expertise in relevant technologies and domains.
    - Maintain a concise, formal, and impactful tone.
  
    *Resume Data:*
    ${JSON.stringify(resumeData, null, 2)}
  
    Return the corrected resume data in the same structure.
  `;

    // Call AI model
    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema,
      prompt,
    });

    console.log(object.correctedResume);
    return NextResponse.json({ data: object.correctedResume }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process resume" },
      { status: 500 }
    );
  }
}
