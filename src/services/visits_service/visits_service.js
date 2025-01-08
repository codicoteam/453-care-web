import axios from "axios";

const BASE_URL = "https://care-give-backend.onrender.com/api/v1/visit_route";

const VisitsService = {

  getAllVisitsByEmployee: async (employeeId) => {
    try {
      const response = await axios.get(`${BASE_URL}/emplyeeid/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  visits by employeid";
    }
 
  },

  getAllVisitsByClientId: async (clientId) => {
    try {
      const response = await axios.get(`${BASE_URL}/client/${clientId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  visits by clientID";
    }
 
  },

  getAllVisits: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getall`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  visits ";
    }
 
  },

 postVisit : async (visitData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, visitData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to create visit  ";
    }
  },
  updateVisitById : async (visitId, updatedData) => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${visitId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating visit:', error.response?.data || error.message);
      throw error;
    }
  },

    deleteVisitById : async (visitId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${visitId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
        }

      );
      return response.data; 
    } catch (error) {
      console.error("Error deleting visit:", error);
      throw error; 
    }
  }
  
};

 




const getAuthToken = () => {
console.log(localStorage.getItem("adminToken"));

  return localStorage.getItem("adminToken");
};



export default VisitsService;
