import axios from "axios";

const API_URL = "https://care-give-backend.onrender.com/api/v1/employee/signup";

const AddCarerService = {
  addNewCarer: async (carerData) => {
    try {
      const response = await axios.post(API_URL, carerData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Error adding new carer";
    }
  },
};

export default AddCarerService;
