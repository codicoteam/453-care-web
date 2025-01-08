import axios from "axios";

const BASE_URL = "https://care-give-backend.onrender.com/api/v1/clients";

const ClientService = {

  getAllClient: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getallclients`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  client";
    }
 
  },



 postClient : async (clientData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, clientData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to create visit  ";
    }
  }
};





const getAuthToken = () => {
console.log(localStorage.getItem("adminToken"));

  return localStorage.getItem("adminToken");
};



export default ClientService;
