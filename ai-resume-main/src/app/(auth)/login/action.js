import axios from "axios";

export async function loginUser(formData) {
  try {
    // console.log("🔵 Attempting login for:", formData.email);

    const response = await axios.post("/api/auth/login", {
      email: formData.email,
      password: formData.password,
    });

    // console.log("✅ Login successful:", response.data);
    return response.data; // Ensure the frontend receives the response

  } catch (error) {
    
    return { success: false, error: error.response?.data?.error || "Something went wrong!" };
  }
}

