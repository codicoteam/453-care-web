import axios from "axios";

const BASE_URL =
  "https://healthpath-backend-qypx.onrender.com/api/v1/pharmacy_route";

const PharmacyService = {
  getAllPharmacies: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get_all_pharmacies`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve pharmacies";
    }
  },

  getPharmacyById: async (pharmacyId) => {
    try {
      const response = await axios.get(`${BASE_URL}/get/${pharmacyId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve pharmacy";
    }
  },

  postPharmacy: async (pharmacyData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/create_pharmacy`,
        pharmacyData,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to create pharmacy";
    }
  },

  updatePharmacyById: async (pharmacyId, updatedData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/update/${pharmacyId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error updating pharmacy:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  deletePharmacyById: async (pharmacyId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/delete_pharmacy/${pharmacyId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting pharmacy:", error);
      throw error;
    }
  },
};

const getAuthToken = () => {
  console.log(localStorage.getItem("adminToken"));
  return localStorage.getItem("adminToken");
};

export default PharmacyService;
