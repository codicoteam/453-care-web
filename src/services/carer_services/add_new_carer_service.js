import axios from "axios";

const API_URL = "https://care-give-backend.onrender.com/api/v1/employee/signup";

const AddCarerService = {
  addNewCarer: async (carerData) => {
    try {
      console.log("Carer data service:", JSON.stringify(carerData)); // Convert to JSON for logging
      const response = await axios.post(API_URL, JSON.stringify(carerData), {
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Error adding new carer";
    }
  },
};

export default AddCarerService;
