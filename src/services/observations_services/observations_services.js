import axios from "axios";

const BASE_URL = "https://care-give-backend.onrender.com/api/v1/observation_route";

const ObservationsService = {

  getObservationsByVisit: async (visitId) => {
    try {
      const response = await axios.get(`${BASE_URL}/visit/${visitId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  observations by visit id";
    }
 
  },


  getAllObservations: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getall`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  obsevations ";
    }
 
  },

 postObservation : async (observationData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, observationData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to create observation  ";
    }
  }
};





const getAuthToken = () => {
console.log(localStorage.getItem("adminToken"));

  return localStorage.getItem("adminToken");
};



export default ObservationsService;
