import axios from "axios";

const BASE_URL = "https://care-give-backend.onrender.com/api/v1/booking_route";

const AppointmentService = {




  getAllAppointments: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getall`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  appointment ";
    }
 
  },

 


  updateAppointmentsById : async (appointmentId, updatedData) => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${appointmentId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating appointment:', error.response?.data || error.message);
      throw error;
    }
  },


  deleteAppointmentById : async (appointmentId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${appointmentId}`,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            'Content-Type': 'application/json',
          },
        }

      );
      return response.data; 
    } catch (error) {
      console.error("Error deleting appointment:", error);
      throw error; 
    }
  }



};








const getAuthToken = () => {
console.log(localStorage.getItem("adminToken"));

  return localStorage.getItem("adminToken");
};



export default AppointmentService;
