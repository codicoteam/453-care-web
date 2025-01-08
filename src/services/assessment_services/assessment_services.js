import axios from "axios";

const BASE_URL = "https://care-give-backend.onrender.com/api/v1/asessment_route";

const AssessmentService = {

  getAssessmentByEmployee: async (employeeId) => {
    try {
      const response = await axios.get(`${BASE_URL}/employee/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  assessment by employeid";
    }
 
  },


  getAllAssessment: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getall`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  assessments ";
    }
 
  },

 postAssessment : async (assessmentData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, assessmentData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to create assessment  ";
    }
  },


  updateAssessmentById : async (assessmentId, updatedData) => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${assessmentId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating assessment:', error.response?.data || error.message);
      throw error;
    }
  },


  deleteAssessmentById : async (assessmentId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${assessmentId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
        }

      );
      return response.data; 
    } catch (error) {
      console.error("Error deleting assessment:", error);
      throw error; 
    }
  }



};








const getAuthToken = () => {
console.log(localStorage.getItem("adminToken"));

  return localStorage.getItem("adminToken");
};



export default AssessmentService;
