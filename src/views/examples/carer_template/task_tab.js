import CustomNoData from "components/nodata/no_data";
import CustomSkeleton from "components/skeletons/custom_skeleton";
import React, { useEffect, useState } from "react";
import TaskService from "services/task_service/task_service";
import { Row, Button } from "antd";
import { IoIosAdd } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Modal, Input, Form, Select, List, Col } from "antd";
import { showMessage } from "helper/feedback_message_helper";

const TasksTab = ({ visitId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form] = Form.useForm();

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

  // Fetch tasks based on visitId when the component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      if (!visitId) {
        setError("Visit ID is not available");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await TaskService.getTaskByVisit(visitId); // Using the service method
        setTasks(response.data || []);
      } catch (err) {
        setError(err.message || "Error fetching tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [visitId]);

  // Handle adding a new task
  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const newTask = {
        name: values.taskName,
        description: values.taskDescription,
        status: values.taskStatus,
        visitId: visitId,
        assignedBy: "675ebf0a6cd21d8db1a29697", // Placeholder for the assignedBy field
      };

      const response = await TaskService.postTask(newTask); // Using the service method
      showMessage("success", "Task added successfully!");
      setLoading(false);
      setShowForm(false); // Hide form after submission
    } catch (error) {
      showMessage("error", "Failed to add task. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <Row>
        <div className="col my-4"></div>
        <div className="col text-right">
          <Button
            href="#pablo"
            size="sm"
            style={{
              backgroundColor: showForm ? "grey" : "green",
              color: "white",
              borderColor: "green",
            }}
            onClick={() => setShowForm(!showForm)} // Toggle form visibility
          >
            {showForm ? <IoMdArrowRoundBack /> : <IoIosAdd size={25} />}
            {showForm ? "Back to Tasks" : "Add Task"} {/* Toggle button text */}
          </Button>
        </div>
      </Row>

      {showForm ? (
        // Show the form if showForm is true
        <div style={formContainerStyle}>
          <h4 style={headingStyle}>Add New Task</h4>
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
              label="Task Name"
              name="taskName"
              rules={[
                { required: true, message: "Please enter the task name" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Description"
              name="taskDescription"
              rules={[
                {
                  required: true,
                  message: "Please enter the task description",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Status"
              name="taskStatus"
              rules={[
                { required: true, message: "Please select the task status" },
              ]}
            >
              <Select placeholder="Select Status">
                <Select.Option value="Pending">Pending</Select.Option>
                <Select.Option value="Completed">Completed</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "green", borderColor: "green" }}
              >
                Add Task
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : loading ? (
        <CustomSkeleton height="200px" width="100%" />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : tasks.length > 0 ? (
        // Show task list if there are tasks
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
