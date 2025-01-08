import axios from "axios";
import TokenStorageService from "helper/local_storage_helper";
import { jwtDecode } from "jwt-decode"; // Correct import for named export

const BASE_URL = "https://care-give-backend.onrender.com/api/v1/employee";

const CarerService = {

  getAllCarers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getallemployees`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  categories";
    }
 
  },



  updateCarerById : async (carerId, updatedData) => {
    try {
      const response = await axios.put(`${BASE_URL}/updateemployee/${carerId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating carer:', error.response?.data || error.message);
      throw error;
    }
  },


  deleteCarerById : async (carerId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/deleteemployee/${carerId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
        }

      );
      return response.data; 
    } catch (error) {
      console.error("Error deleting carer:", error);
      throw error; 
    }
  }









};




const getAuthToken = () => {
console.log(localStorage.getItem("adminToken"));

  return localStorage.getItem("adminToken");
};



export default CarerService;
