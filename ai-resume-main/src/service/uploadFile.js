
import axios from "axios";


export async function uploadPDF(file) {

  const formData = new FormData();
  formData.append("file", file);

  try {
    
    const response = await axios.post("/api/upload", formData, {
      withCredentials: true, 
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Axios upload error:", error);
    throw error;
  }
}

export async function getPDFLinks() {
  try {
    const response = await axios.get("/api/upload", {
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching PDF links:", error);
    throw error;
  }
}