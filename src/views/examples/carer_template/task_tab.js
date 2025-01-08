import CustomNoData from "components/nodata/no_data";
import CustomSkeleton from "components/skeletons/custom_skeleton";
import React, { useEffect, useState } from "react";
import TaskService from "services/task_service/task_service";
import { Row, Button } from "antd";
import { IoIosAdd } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";

const TasksTab = ({ visitId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [frequency, setFrequency] = useState("daily");
  const [selectedDays, setSelectedDays] = useState([]);

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const timeSlots = ["Morning", "Afternoon", "Evening", "Night"];

  const formContainerStyle = {
    padding: "1.5rem",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  };

  const headingStyle = {
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: "1rem",
  };

  const formGroupStyle = {
    marginBottom: "1rem",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: 500,
    marginBottom: "0.25rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #e5e7eb",
    borderRadius: "0.375rem",
  };

  const checkboxContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  };

  const getFrequencyButtonStyle = (option) => ({
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    transition: "all 0.2s",
    border: "2px solid transparent",
    backgroundColor: frequency === option ? "#dcfce7" : "#f9fafb",
    color: frequency === option ? "#166534" : "#374151",
    textTransform: "capitalize",
    cursor: "pointer",
    ":hover": {
      borderColor: "#22c55e",
    },
  });

  const getDayButtonStyle = (day) => ({
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    transition: "all 0.2s",
    border: "2px solid transparent",
    backgroundColor: selectedDays.includes(day) ? "#dcfce7" : "#f9fafb",
    color: selectedDays.includes(day) ? "#166534" : "#374151",
    cursor: "pointer",
    ":hover": {
      borderColor: "#22c55e",
    },
  });

  const timeSlotButtonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    backgroundColor: "#f9fafb",
    border: "2px solid transparent",
    cursor: "pointer",
    ":hover": {
      borderColor: "#22c55e",
    },
  };

  const submitButtonStyle = {
    backgroundColor: "#16a34a",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#15803d",
    },
  };

  const handleDaySelect = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      if (!visitId) {
        setError("Visit ID is not available");
        return;
      }

      setLoading(true);
      setError("");

      setLoading(true);
      setError("");

      try {
        const response = await TaskService.getTaskByVisit(visitId);
        setTasks(response.data || []);
      } catch (err) {
        setError(err.message || "Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [visitId]);

  return (
    <div>
      <Row>
        <div className="col my-4"></div>
        <div className="col text-right">
          <Button
            href="#pablo"
            size="sm"
            style={{
              backgroundColor:  showForm ? "grey" : "green",
              color: "white",
              borderColor: "green",
            }}
            onClick={() => setShowForm(!showForm)} // Toggle the state
          >
            {showForm ? <IoMdArrowRoundBack /> : <IoIosAdd size={25} />}{" "}
            {/* Toggle button text */}
            {showForm ? "Back to Tasks" : "Add Task"} {/* Toggle button text */}
          </Button>
        </div>
      </Row>

      {showForm ? (
        // Show the form if `showForm` is true
        <div style={formContainerStyle}>
          <h4 style={headingStyle}>Add New Task</h4>
          <form>
            <div style={formGroupStyle}>
              <label htmlFor="taskName" style={labelStyle}>
                Task Name
              </label>
              <input
                type="text"
                style={inputStyle}
                id="taskName"
                placeholder="Enter task name"
              />
            </div>

            <div style={formGroupStyle}>
              <label htmlFor="taskDescription" style={labelStyle}>
                Description
              </label>
              <textarea
                style={inputStyle}
                id="taskDescription"
                placeholder="Enter task description"
                rows="3"
              />
            </div>

            <div style={formGroupStyle}>
              <label style={checkboxContainerStyle}>
                <input type="checkbox" />
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  Mark as Essential
                </span>
              </label>
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>Frequency</label>
              <div style={buttonContainerStyle}>
                {["daily", "weekly"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFrequency(option)}
                    style={getFrequencyButtonStyle(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {frequency === "weekly" && (
              <div style={formGroupStyle}>
                <label style={labelStyle}>Select Days</label>
                <div style={buttonContainerStyle}>
                  {weekDays.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDaySelect(day)}
                      style={getDayButtonStyle(day)}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={formGroupStyle}>
              <label style={labelStyle}>Select Time</label>
              <div style={buttonContainerStyle}>
                {timeSlots.map((slot) => (
                  <button key={slot} type="button" style={timeSlotButtonStyle}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div style={formGroupStyle}>
              <label htmlFor="taskStatus" style={labelStyle}>
                Status
              </label>
              <select style={inputStyle} id="taskStatus">
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <Button type="submit" style={submitButtonStyle}>
              Save Task
            </Button>
          </form>
        </div>
      ) : loading ? (
        <CustomSkeleton height="200px" width="100%" />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : tasks.length > 0 ? (
        // Show the task list if `showForm` is false
        <div sm="6">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="pl-3 pr-3 mx-2 bg-white rounded-lg shadow border border-gray-200 p-4 mb-5 max-w-sm hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              <h4 className="mb-2 text-gray-700">Name: {task.name}</h4>
              <h4 className="mb-2 text-gray-700">
                Description: {task.description}
              </h4>
              <h4 className="mb-2 text-gray-700">Status: {task.status}</h4>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-4">
          <CustomNoData width="70px" height="70px" />
        </div>
      )}
    </div>
  );
};

export default TasksTab;
