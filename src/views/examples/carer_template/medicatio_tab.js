import CustomNoData from "components/nodata/no_data";
import CustomSkeleton from "components/skeletons/custom_skeleton";
import React, { useEffect, useState } from "react";
import MedicationService from "services/medication_services/medication_services";
import { IoIosAdd } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Row, Button, Modal } from "antd";
import { showMessage } from "helper/feedback_message_helper";
import { Form, Input, Select } from "antd";

const MedicationTab = ({ visitId }) => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form] = Form.useForm();
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Add the missing style definitions here:
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

  const handleDaySelect = (day) => {
    // Handle frequency selection
  };

  useEffect(() => {
    const fetchMedication = async () => {
      if (!visitId) return;

      setLoading(true);
      setError("");

      try {
        const response = await MedicationService.getMedicationByVisit(visitId);
        setMedications(response.data || []);
      } catch (err) {
        setError(err.message || "Error fetching medications");
      } finally {
        setLoading(false);
      }
    };

    fetchMedication();
  }, [visitId]);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const newMedication = {
        name: values.name,
        description: values.description,
        status: values.status,
        frequency: values.frequency,
        dosage: values.dosage,
        visitId: visitId,
        prescribedBy: "675ebf0a6cd21d8db1a29697", // Placeholder for the assignedBy field
        clientId: "675eaa3279915a77996c8884", // Placeholder for the clientId
      };

      const response = await MedicationService.postMedications(newMedication);

      setMedications((prevMedications) => [...prevMedications, response.data]);

      showMessage("success", "Medication added successfully!");
      setLoading(false);
      setShowForm(false);
    } catch (error) {
      showMessage("error", "Failed to add Medication. Please try again.");
      setLoading(false);
    }
  };

  const handleViewMore = (medication) => {
    setSelectedMedication(medication);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedMedication(null);
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
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? <IoMdArrowRoundBack /> : <IoIosAdd size={25} />}
            {showForm ? "Back to Medictions" : "Add Mediction"}
          </Button>
        </div>
      </Row>

      {showForm ? (
        <div style={formContainerStyle}>
          <h4 style={headingStyle}>Add New Medication</h4>
          <Form form={form} layout="vertical" onFinish={handleFinish}>
            <Form.Item
              label="Medication"
              name="name"
              rules={[
                { required: true, message: "Please enter the medication name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please enter the medication description",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Frequency"
              name="frequency"
              rules={[
                {
                  required: true,
                  message: "Please select the frequency for medication",
                },
              ]}
            >
              <Select placeholder="Select frequency">
                <Select.Option value="Once A Day">Once A Day</Select.Option>
                <Select.Option value="Twice A day">Twice A day</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Dosage"
              name="dosage"
              rules={[
                {
                  required: true,
                  message: "Please enter the medication dosage",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please select the medication status",
                },
              ]}
            >
              <Select placeholder="Select Status">
                <Select.Option value="Pending">Pending</Select.Option>
                <Select.Option value="Taken">Taken</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "green", borderColor: "green" }}
              >
                Add Medication
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : loading ? (
        <CustomSkeleton height="200px" width="100%" />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : medications.length > 0 ? (
        <div sm="6">
          {medications.map((medication) => (
            <div
              key={medication.id}
              className="pl-3 pr-3 mx-2 bg-white rounded-lg shadow border border-gray-200 p-4 mb-5 max-w-sm hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              <h4 className="mb-2 text-gray-700">Name: {medication.name}</h4>
              <h4 className="mb-2 text-gray-700">
                Description: {medication.description}
              </h4>
              <h4 className="mb-2 text-gray-700">
                Status: {medication.status}
              </h4>
              <h4 className="mb-2 text-gray-700">
                Frequency: {medication.frequency}
              </h4>

              <Row>
                <div className="col"></div>
                <div className="col text-right">
                  <Button
                    color="primary"
                    onClick={() => handleViewMore(medication)}
                    size="sm"
                  >
                    View More
                  </Button>
                </div>
              </Row>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-4">
          <CustomNoData width="70px" height="70px" />
        </div>
      )}

      {/* Modal to show more details */}
      <Modal
        title="Medication Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        width={600}
      >
        {selectedMedication ? (
          <div>
            <h4>Name: {selectedMedication.name}</h4>
            <h4>Description: {selectedMedication.description}</h4>
            <h4>Status: {selectedMedication.status}</h4>
            <h4>Frequency: {selectedMedication.frequency}</h4>
            <h4>Dosage: {selectedMedication.dosage}</h4>
            <h4>Prescribed By: {selectedMedication.prescribedBy}</h4>
            {/* Add more fields as necessary */}
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default MedicationTab;
