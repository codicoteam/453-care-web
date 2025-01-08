import axios from "axios";

const BASE_URL = "https://care-give-backend.onrender.com/api/v1/runner_route";

const RunnerService = {

  getRunnerByEmployee: async (employeeId) => {
    try {
      const response = await axios.get(`${BASE_URL}/emplyeeid/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  runner by employeid";
    }
 
  },

 

  getAllRunner: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getall`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  runner ";
    }
 
  },

 postRunner : async (runnerData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, runnerData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to create runner  ";
    }
  },
  updateRunnerById : async (runnerId, updatedData) => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${runnerId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating runner:', error.response?.data || error.message);
      throw error;
    }
  },

    deleteRunnerById : async (runnerId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${runnerId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
        }

      );
      return response.data; 
    } catch (error) {
      console.error("Error deleting runner:", error);
      throw error; 
    }
  }
  
};

 




const getAuthToken = () => {
console.log(localStorage.getItem("adminToken"));

  return localStorage.getItem("adminToken");
};



export default RunnerService;
