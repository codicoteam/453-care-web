import axios from "axios";

const BASE_URL = "https://care-give-backend.onrender.com/api/v1/task_route";

const TaskService = {
  getTaskByVisit: async (visitId) => {
    try {
      const response = await axios.get(`${BASE_URL}/visit/${visitId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  task by visit id";
    }
  },

  getAllTask: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getall`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to retrieve  task ";
    }
  },

  postTask: async (taskData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, taskData, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Failed to create task  ";
    }
  },

  updateTaskById: async (taskId, updatedData) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/update/${taskId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error updating task:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  deleteTasksById: async (tasksId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete/${tasksId}`, {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting tasks:", error);
      throw error;
    }
  },
};

const getAuthToken = () => {
  console.log(localStorage.getItem("adminToken"));

  return localStorage.getItem("adminToken");
};

export default TaskService;
