import axios from "axios";

const BASE_URL =
  "https://healthpath-backend-qypx.onrender.com/api/v1/medicine_route";

const MedicineService = {
  getAllMedicines: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getAllMedicines`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve medicines";
    }
  },

  getMedicineById: async (medicineId) => {
    try {
      const response = await axios.get(`${BASE_URL}/get/${medicineId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve medicine";
    }
  },

  getMedicinesByPharmacyId: async (pharmacyId) => {
    try {
      console.log(pharmacyId);
      console.log("Fetching medicines for pharmacyId:", pharmacyId);

      const response = await axios.get(
        `${BASE_URL}/get_medicines_by_pharmacy/${pharmacyId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve medicines for pharmacy";
    }
  },

  postMedicine: async (medicineData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/create_medicine`,
        medicineData,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to create medicine";
    }
  },

  updateMedicineById: async (medicineId, updatedData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/update/${medicineId}`,
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
        "Error updating medicine:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  deleteMedicineById: async (medicineId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${medicineId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting medicine:", error);
      throw error;
    }
  },
};

const getAuthToken = () => {
  return localStorage.getItem("adminToken");
};

export default MedicineService;
