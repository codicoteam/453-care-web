import axios from "axios";

const BASE_URL = "https://care-give-backend.onrender.com/api/v1/family_member";

const FamilyService = {

 

  getAllMembers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getallfamilymembers`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  family members ";
    }
 
  },

 postTask : async (familyData) => {
    try {
      const response = await axios.post(`${BASE_URL}/signup`, familyData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to create family member  ";
    }
  },

  updateFamilyById : async (familyId, updatedData) => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${familyId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating member:', error.response?.data || error.message);
      throw error;
    }
  },


  deleteFamilyById : async (tasksId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${tasksId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
        }

      );
      return response.data; 
    } catch (error) {
      console.error("Error deleting fmaily:", error);
      throw error; 
    }
  }
};





const getAuthToken = () => {
console.log(localStorage.getItem("adminToken"));

  return localStorage.getItem("adminToken");
};



export default FamilyService;
