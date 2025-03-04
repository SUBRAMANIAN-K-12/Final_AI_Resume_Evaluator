import axios from "axios";

export async function analyzeOverall(text) {
  try {
    const { data } = await axios.post("/api/ai/analzeresume", { text });
    return data.data;
  } catch (error) {
    console.error("Error calling /api/process:", error);
    throw error;
  }
}




export const jobAnalysis = async (jobData) => {
  console.log("service called");
  try {
    const response = await axios.post("/api/ai/jobdescription", jobData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.data) {
      throw new Error("Invalid response from server");
    }
   
    return response.data;
  } catch (error) {
    console.error("Error in jobAnalysis service:", error);
    return { error: "Failed to analyze job data. Please try again later." };
  }
};

