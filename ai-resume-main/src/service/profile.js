// service/profile.js
import axios from 'axios';

export async function fetchUserProfile() {
  try {
    const res = await axios.get('/api/profile');
    return res.data;
  } catch (error) {
   
    if (error.response) {
      console.error('Error fetching user profile:', error.response.data);
    } else {
      console.error('Error fetching user profile:', error.message);
    }
    return null;
  }
}

export async function updateUserProfile(updatedProfile) {
  try {
    const res = await axios.put("/api/profile", updatedProfile);
    return res.status === 200;
  } catch (error) {
    console.error("Error updating profile:", error.response ? error.response.data : error.message);
    return false;
  }
}
