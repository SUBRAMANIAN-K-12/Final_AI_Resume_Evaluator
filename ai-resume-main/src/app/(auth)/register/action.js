
import axios from "axios";

export async function registerUser(userData) {
  try {
    console.log(" Sending request with:", userData);

    const response = await axios.post(
      "/api/auth/register", userData
    );

    
    return response.data;
  } catch (error) {
    
    return { success: false, error: "Already Registered User." };
  }
}
