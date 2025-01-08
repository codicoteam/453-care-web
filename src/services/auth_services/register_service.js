import axios from "axios";
import TokenStorageService from "helper/local_storage_helper";

const BASE_URL = "https://care-give-backend.onrender.com/api/v1/admin_route";

const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);

    // Extract the token from the response
    const { token } = response.data.token;

    // Store the token using the TokenStorageService
    if (token) {
      TokenStorageService.storeToken(token);
      console.log("Token stored successfully!");
    }
console.log(response.data.token);

    return response.data; 
  } catch (error) {
    console.error("Error registering user:", error.response?.data || error.message);
    throw error; 
  }
};

export default registerUser;
