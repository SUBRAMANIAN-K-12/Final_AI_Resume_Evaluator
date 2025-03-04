import axios from "axios";
 
export default async function logout() {
  console.log("Logout function called"); // Debugging log
  try {
    const response = await axios.post("/api/auth/logout");
    console.log("Logout API Response:", response); // Debugging log
    // Redirect user after logout
    window.location.href = "/";
 
    return response.data;
  } catch (error) {
    console.error("Error logging out", error);
  }
}