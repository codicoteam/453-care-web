import axios from "axios";

const BASE_URL = "https://care-give-backend.onrender.com/api/v1/medication_route";

const MedicationService = {

  getMedicationByVisit: async (visitId) => {
    try {
      const response = await axios.get(`${BASE_URL}/visit/${visitId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  medication by visit id";
    }
 
  },


  getAllMedications: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getall`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  medications ";
    }
 
  },

 postMedications : async (medicationData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, medicationData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to create medication  ";
    }
  },

  updateMedicationById : async (medicationId, updatedData) => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${medicationId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating medication:', error.response?.data || error.message);
      throw error;
    }
  },


  deleteMedicationById : async (medicationId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${medicationId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
        }

      );
      return response.data; 
    } catch (error) {
      console.error("Error deleting medication:", error);
      throw error; 
    }
  }
};





const getAuthToken = () => {
console.log(localStorage.getItem("adminToken"));

  return localStorage.getItem("adminToken");
};



export default MedicationService;
