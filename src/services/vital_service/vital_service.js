import axios from "axios";

const BASE_URL = "https://care-give-backend.onrender.com/api/v1/patient_vitals_route";

const VitalService = {

  getVitalByPatient: async (patientId) => {
    try {
      const response = await axios.get(`${BASE_URL}/patient/${patientId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  vital by patientid";
    }
 
  },


  getVitalByVisit: async (visitId) => {
    try {
      const response = await axios.get(`${BASE_URL}/visit/${visitId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  vital by visitid";
    }
 
  },

  getVitalById: async (vitalid) => {
    try {
      const response = await axios.get(`${BASE_URL}/get/${vitalid}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  vital by id";
    }
 
  },



  getAllVital: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getall`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  patient ";
    }
 
  },

 postVitals : async (vitalData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, vitalData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to create vital  ";
    }
  },


  updateVitalById : async (vitalId, updatedData) => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${vitalId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating vital:', error.response?.data || error.message);
      throw error;
    }
  },


  deleteVitalById : async (vitalId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${vitalId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
        }

      );
      return response.data; 
    } catch (error) {
      console.error("Error deleting vital:", error);
      throw error; 
    }
  }



};








const getAuthToken = () => {
console.log(localStorage.getItem("adminToken"));

  return localStorage.getItem("adminToken");
};



export default VitalService;
