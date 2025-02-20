/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import HomeTable from "components/tables/home_table";

import {
  Button,
  Card,
  CardTitle,
  CardHeader,
  CardText,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { AudioOutlined } from "@ant-design/icons";
import PrimaryButton from "components/buttons/primary_button";
import CarerService from "services/carer_services/carer_service";
import { useEffect, useState } from "react";
import CustomSkeleton from "components/skeletons/custom_skeleton";
import CustomNoData from "components/nodata/no_data";
import CustomErrorResult from "components/customised_results/error_result";
import VisitsService from "services/visits_service/visits_service";
import { Modal } from "antd";
import { FaClock, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { UserOutlined } from "@ant-design/icons";
import { Polar } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import {
  DatePicker,
  Drawer,
  Form,
  Input,
  Switch,
  Select,
  Avatar,
  Space,
  message,
} from "antd";
import AddCarerService from "services/carer_services/add_new_carer_service";
import { showMessage } from "helper/feedback_message_helper";
import CustomSpin from "components/customised_spins/customised_sprin";
import AssessmentService from "services/assessment_services/assessment_services";
import { Tabs } from "antd";
import ObservationsTab from "./carer_template/observation_tab";
import TasksTab from "./carer_template/task_tab";
import { FaEdit } from "react-icons/fa";
import EditEmployeeModal from "./carer_template/edit_carer";
import WarningComponent from "components/customersed_warning/warning_component";
import { supabase } from "helper/supabase/supabaseClient";
import VitalsTab from "./carer_template/vitals_tab";
import UserLocationMap from "./visit_templates/visit_map";
import { TimePicker } from "antd";

const { Option } = Select;

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);

const MyCarer = () => {
  const [carers, setCarers] = useState([]);
  const [visits, setVisits] = useState([]);

  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visitloading, setVisitLoading] = useState(true);
  const [assessmentloading, setAssessmentLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visiterror, setVisitError] = useState(null);
  const [assessmenterror, setAssessmentError] = useState(null);
  const [open, setOpen] = useState(false);
  const [openassessments, setOpenAssessments] = useState(false);

  const [imageUrl, setImageUrl] = useState(null);
  const handleFileUpload = async (event) => {
    console.log("handlefileupload");
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      console.error("Invalid file type. Please upload an image.");
      return;
    }

    const fileName = `${Date.now()}_${file.name}`;

    // Upload image to the Supabase bucket
    const { data, error } = await supabase.storage
      .from("care_app")
      .upload(fileName, file);

    if (error) {
      console.error("Error uploading file:", error.message);
      return;
    }

    // Get the public URL of the uploaded image
    const { data: publicData } = supabase.storage
      .from("care_app")
      .getPublicUrl(fileName);
    if (publicData) {
      console.log(publicData.publicUrl);
      setImageUrl(publicData.publicUrl);
    }
  };

  console.log(imageUrl);

  useEffect(() => {
    const fetchCarers = async () => {
      try {
        const response = await CarerService.getAllCarers();
        setCarers(response.data || []);
      } catch (err) {
        setError(err.message || "Error fetching carers");
      } finally {
        setLoading(false);
      }
    };

    fetchCarers();
  }, []);
  const [selectedCarer, setSelectedCarer] = useState(null);

  useEffect(() => {
    const fetchVisit = async () => {
      if (!selectedCarer) {
        return; // Exit if no carer is selected
      }

      setVisitLoading(true); // Show loading state
      try {
        const visitss = await VisitsService.getAllVisitsByEmployee(
          selectedCarer._id
        );
        console.log("selectedcarer id ", selectedCarer._id);

        setVisits(visitss.data || []); // Update visits state
        console.log("vists date of visit", visits);
      } catch (err) {
        setVisitError(err.message || "Error fetching visits"); // Handle error
      } finally {
        setVisitLoading(false); // Hide loading state
      }
    };

    fetchVisit();
  }, [selectedCarer]);

  const numberOfVisits = visits.length;

  const completedVisits = visits.filter(
    (visit) => visit.status === "Completed"
  );
  const numberOfCompletedVisits = completedVisits.length;

  const totalHours = visits.reduce((acc, visit) => {
    const start = new Date(visit.startTime); // Convert startTime to Date object
    const end = new Date(visit.endTime); // Convert endTime to Date object

    // Calculate the difference in milliseconds
    const timeDifference = end - start;

    // Convert milliseconds to hours (1 hour = 3600000 milliseconds)
    const hours = timeDifference / 3600000;

    return acc + hours; // Sum the hours
  }, 0);

  const totalPayment = visits.reduce((acc, visit) => {
    const start = new Date(visit.startTime); // Convert startTime to Date object
    const end = new Date(visit.endTime); // Convert endTime to Date object

    // Calculate the difference in milliseconds
    const timeDifference = end - start;

    // Convert milliseconds to hours (1 hour = 3600000 milliseconds)
    const hours = timeDifference / 3600000;
    const payment = hours * visit.amount_paid_per_hour;

    return acc + payment; // Sum the hours
  }, 0);

  const totalHoursOfCompletedVisits = completedVisits.reduce((acc, cvisit) => {
    const start = new Date(cvisit.startTime); // Convert startTime to Date object
    const end = new Date(cvisit.endTime); // Convert endTime to Date object

    // Calculate the difference in milliseconds
    const timeDifference = end - start;

    // Convert milliseconds to hours (1 hour = 3600000 milliseconds)
    const hours = timeDifference / 3600000;

    return acc + hours; // Sum the hours
  }, 0);

  // Define status counts
  const statusCounts = {
    Completed: 0,
    Ongoing: 0,
    Scheduled: 0,
  };

  // Count the visits by their status
  visits.forEach((visit) => {
    if (statusCounts[visit.status] !== undefined) {
      statusCounts[visit.status]++;
    }
  });

  // Prepare data for the Polar chart
  const labels = ["Completed", "Ongoing", "Scheduled"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Visits by Status",
        data: [
          statusCounts.Completed,
          statusCounts.Ongoing,
          statusCounts.Scheduled,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)", // Completed (Green)
          "rgba(255, 159, 64, 0.5)", // Ongoing (Orange)
          "rgba(153, 102, 255, 0.5)", // Scheduled (Purple)
        ],
      },
    ],
  };

  // Chart.js configuration
  const options = {
    responsive: true,
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Visits by Status",
    },
  };

  useEffect(() => {
    const fetchAssessments = async () => {
      if (!selectedCarer) {
        return; // Exit if no carer is selected
      }

      setAssessmentLoading(true);
      try {
        const assessmentss = await AssessmentService.getAssessmentByEmployee(
          selectedCarer._id
        );
        console.log("selectedcarer id ", selectedCarer._id);

        setAssessments(assessmentss.data || []); // Update visits state
        console.log("vists date of assessments", assessments);
      } catch (err) {
        setVisitError(err.message || "Error fetching assessments"); // Handle error
      } finally {
        setAssessmentLoading(false); // Hide loading state
      }
    };

    fetchAssessments();
  }, [selectedCarer]);

  const handleSelectCarer = (carer) => {
    setSelectedCarer(carer);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVisitId, setSelectedVisitId] = useState(null);
  const [deleteloading, setDeleteLoading] = useState(false);

  const handleDeleteClick = (carerId) => {
    setSelectedVisitId(carerId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await CarerService.deleteCarerById(selectedCarer);
      showMessage("success", "Carer successfully deleted!");
      setCarers((prevCarers) =>
        prevCarers.filter((carer) => carer._id !== selectedCarer)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      showMessage("Something went wrong!");
    } finally {
      setDeleteLoading(false);
    }
  };

  const [opend, setOpend] = useState(false);

  const showDrawer = () => {
    setOpend(true);
  };
  const onClose = () => {
    setOpend(false);
  };

  const [searchTerm, setSearchTerm] = useState("");

  // Filter carers based on searchTerm
  const filteredCarers = carers.filter((carer) =>
    carer.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [form] = Form.useForm();
  const [addloading, setAddLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("adding carer");

      const carerData = {
        firstName: values.firstname,
        lastName: values.lastname,
        profilePicture: imageUrl, // Example static valueimageUrl
        email: values.email,
        contactNumber: values.contactnumber,
        address: values.address,
        specialization: values.specialization,
        employmentType: "Full-time", // Example static value
        workingHours: {
          startHour: "09:30",
          endHour: "07:30",
        },
        hasCar: values.hasCar || false,
        carDetails: values.carDetails || "",
        insurance: values.hasInsurance || false,
        insuranceDetails: values.insuranceDetails || "",
        password: "secureygyuguyguPahgffhgssword123", // Example static value
      };
      console.log(carerData);

      setAddLoading(true);
      await AddCarerService.addNewCarer(carerData);
      showMessage("success", "Adding carer successfully!");
      console.log(await AddCarerService.addNewCarer(carerData));

      form.resetFields();
      onClose();
    } catch (error) {
      showMessage("error", error || "Something went wrong!");
    } finally {
      setAddLoading(false);
    }
  };

  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "Personal Care",
      children: (
        <div>
          <Input placeholder="Input 1" style={{ marginBottom: "10px" }} />
          <Input placeholder="Input 2" style={{ marginBottom: "10px" }} />
          <Input placeholder="Input 3" style={{ marginBottom: "10px" }} />
        </div>
      ),
    },
    {
      key: "2",
      label: "Everyday Activities",
      children: <div>This is some text content for Tab 2.</div>,
    },
    {
      key: "3",
      label: "Medicals",
      children: (
        <div>
          <p>This is the first text in Tab 3.</p>
          <p>This is the second text in Tab 3.</p>
        </div>
      ),
    },
    {
      key: "4",
      label: "Social Support",
      children: (
        <div>
          <p>This is the first text in Tab 3.</p>
          <p>This is the second text in Tab 3.</p>
        </div>
      ),
    },
  ];

  const handleUpdate = (updatedData) => {
    console.log("Updated Employee Data:", updatedData);
    // Add logic to update the employee details in your backend or state
  };

  return (
    <>
      <Container className="mt--7 bg-white" fluid>
        <Drawer
          title="Create a new carer"
          width={720}
          onClose={onClose}
          open={opend}
          extra={
            <Space>
              <Button onClick={onClose}>Close</Button>
              <Button
                onClick={handleSubmit}
                type="primary"
                color="primary"
                loading={addloading}
              >
                Submit
              </Button>
            </Space>
          }
        >
          {addloading && <CustomSpin />}
          {!addloading && (
            <Form form={form} layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="firstname"
                    label="First Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter first name",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter first name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastname"
                    label="Last Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter last name",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter last name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter email",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter email" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="contactnumber"
                    label="Contact Number"
                    rules={[
                      {
                        required: true,
                        message: "Please enter contact number",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter contact number" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter a password",
                      },
                      {
                        min: 6,
                        message: "Password must be at least 6 characters",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Please enter password" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="workingHours"
                    label="Working Hours"
                    rules={[
                      {
                        required: true,
                        message: "Please select working hours",
                      },
                    ]}
                  >
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          name="startTime"
                          label="Start Time"
                          rules={[
                            {
                              required: true,
                              message: "Please select start time",
                            },
                          ]}
                        >
                          <TimePicker
                            format="HH:mm"
                            placeholder="Start Time"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          name="endTime"
                          label="End Time"
                          rules={[
                            {
                              required: true,
                              message: "Please select end time",
                            },
                          ]}
                        >
                          <TimePicker
                            format="HH:mm"
                            placeholder="End Time"
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="employeeType"
                    label="Employee Type"
                    rules={[
                      {
                        required: true,
                        message: "Please select employee type",
                      },
                    ]}
                  >
                    <Select placeholder="Please select employee type">
                      <Select.Option value="fullTime">Full-Time</Select.Option>
                      <Select.Option value="partTime">Part-Time</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col
                  span={12}
                  style={{
                    border: "2px dashed lightgreen", // Broken light green border
                    padding: "16px", // Padding inside the column
                  }}
                >
                  <div>
                    <input
                      style={{
                        padding: "16px", // Padding inside the column
                      }}
                      type="file"
                      onChange={handleFileUpload}
                    />
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Uploaded"
                        style={{
                          width: "200px",
                          marginTop: "10px",
                          padding: "16px",
                        }}
                      />
                    ) : (
                      <Avatar size={64} icon={<UserOutlined />} />
                    )}
                  </div>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                      {
                        required: true,
                        message: "Please enter address",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter address" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="specialization"
                    label="Specialization"
                    rules={[
                      {
                        required: true,
                        message: "Please choose specialization",
                      },
                    ]}
                  >
                    <Select placeholder="Please choose specialization">
                      <Option value="Dentist">Dentist</Option>
                      <Option value="Doctor">Doctor</Option>
                      <Option value="Nurse">Nurse</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="hasCar"
                    label="Has Car"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="carDetails"
                    label="Car Details"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="Please enter car details"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="hasInsurance"
                    label="Has Insurance"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="insuranceDetails"
                    label="Insurance Details"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="Please enter insurance details"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
        </Drawer>

        <Row className="mt-5">
          <Col xl="2">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Button onClick={showDrawer} color="success" variant="dashed">
                  Add New Carer
                </Button>
                <Row className="align-items-center">
                  <div className="col mt-4">
                    <h3 className="mb-0" style={{ color: "grey" }}>
                      No user view recorded
                    </h3>
                  </div>
                </Row>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">
                      <div className="row bg-blue align-items-center p-3">
                        <div className="mb-2">
                          <Input
                            placeholder="Search Carers"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                          />
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-violet">
                  {loading ? (
                    <tr>
                      <td>
                        <CustomSkeleton height="200px" width="100%" />
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td>Error: {error}</td>
                    </tr>
                  ) : filteredCarers.length > 0 ? (
                    filteredCarers.map((carer) => (
                      <tr
                        key={carer._id}
                        onClick={() => handleSelectCarer(carer)}
                        style={{
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#e0f7ff")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "transparent")
                        }
                      >
                        <th scope="row">
                          <div className="row">
                            <div className="mr-2">{carer.firstName}</div>
                            <div>{carer.lastName}</div>
                          </div>
                        </th>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>
                        <CustomNoData width="70px" height="70px" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="shadow mb-3">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Carer Details</h2>
                  </div>
                  <div className="col text-right">
                    {selectedCarer && (
                      <EditEmployeeModal
                        selectedCarer={selectedCarer}
                        onUpdate={handleUpdate}
                      />
                    )}
                  </div>
                  <div>
                    {selectedCarer && (
                      <div
                        onClick={() => handleDeleteClick(selectedCarer._id)}
                        style={{
                          cursor: "pointer",
                          color: "red",
                          fontSize: "18px", // Adjust size as needed
                        }}
                      >
                        <MdOutlineDeleteForever />
                      </div>
                    )}
                  </div>
                </Row>
              </CardHeader>
              {selectedCarer ? (
                <div className="p-3">
                  <div>
                    {selectedCarer.profilePicture ? (
                      <img
                        src={selectedCarer.profilePicture}
                        alt="Uploaded"
                        style={{
                          width: "200px",
                          marginTop: "10px",
                          padding: "16px",
                          border: "2px solid grey",
                        }}
                      />
                    ) : (
                      <Avatar
                        style={{
                          width: "200px",
                          marginTop: "10px",
                          padding: "16px",
                        }}
                        size={64}
                        icon={<UserOutlined />}
                      />
                    )}
                  </div>
                  <h4>
                    <span style={{ color: "black", marginRight: "10px" }}>
                      First Name:
                    </span>
                    <span style={{ color: "grey" }}>
                      {selectedCarer.firstName}
                    </span>
                  </h4>
                  <h4>
                    <span style={{ color: "black", marginRight: "10px" }}>
                      Last Name:
                    </span>
                    <span style={{ color: "grey" }}>
                      {selectedCarer.lastName}
                    </span>
                  </h4>
                  <h4>
                    <span style={{ color: "black", marginRight: "10px" }}>
                      Email:
                    </span>
                    <span style={{ color: "grey" }}>{selectedCarer.email}</span>
                  </h4>
                  <h4>
                    <span style={{ color: "black", marginRight: "10px" }}>
                      Phone:
                    </span>
                    <span style={{ color: "grey" }}>
                      {selectedCarer.contactNumber}
                    </span>
                  </h4>
                  <h4>
                    <span style={{ color: "black", marginRight: "10px" }}>
                      Address:
                    </span>
                    <span style={{ color: "grey" }}>
                      {selectedCarer.address}
                    </span>
                  </h4>
                  <h4>
                    <span style={{ color: "black", marginRight: "10px" }}>
                      Specialization:
                    </span>
                    <span style={{ color: "grey" }}>
                      {selectedCarer.specialization}
                    </span>
                  </h4>
                  <h4>
                    <span style={{ color: "black", marginRight: "10px" }}>
                      Employment Type:
                    </span>
                    <span
                      style={{
                        color:
                          selectedCarer.employmentType === "Full-time"
                            ? "green"
                            : "blue",
                      }}
                    >
                      {selectedCarer.employmentType}
                    </span>
                  </h4>

                  <h4>
                    <span style={{ color: "black", marginRight: "10px" }}>
                      Car Details:
                    </span>
                    <span style={{ color: "grey" }}>
                      {selectedCarer.carDetails}
                    </span>
                  </h4>
                  <h4>
                    <span style={{ color: "black", marginRight: "10px" }}>
                      Insurance Details:
                    </span>
                    <span style={{ color: "grey" }}>
                      {selectedCarer.insuranceDetails}
                    </span>
                  </h4>
                </div>
              ) : (
                <div className="p-3">
                  <WarningComponent />
                </div>
              )}
            </Card>
          </Col>

          <Col xl="3">
            <Card className="shadow mb-3">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0 ">Working Summary</h2>
                  </div>
                </Row>
              </CardHeader>
              <div className="p-3">
                {/* Paying Amount Section */}
                <div>
                  <Row className="align-items-center">
                    <div className="col">
                      <h4 className="mb-0 d-flex align-items-center ">
                        <FaDollarSign className="mr-2 text-primary" />
                        Paying Amount: {totalPayment.toFixed(2)}
                      </h4>
                    </div>
                  </Row>
                </div>
                {/* Number of Visits Section */}
                <div>
                  <Row className="align-items-center">
                    <div className="col">
                      <h4 className="mb-0 d-flex align-items-center ">
                        <FaMapMarkerAlt className="mr-2  text-primary" />
                        Number of Visits: {numberOfVisits}
                      </h4>
                    </div>
                  </Row>
                </div>

                <div>
                  <Row className="align-items-center">
                    <div className="col">
                      <h4 className="mb-0 d-flex align-items-center ">
                        <FaMapMarkerAlt className="mr-2 text-primary" />
                        Number of Completed Visits: {numberOfCompletedVisits}
                      </h4>
                    </div>
                  </Row>
                </div>

                <div>
                  <Row className="align-items-center">
                    <div className="col">
                      <h4 className="mb-0 d-flex align-items-center ">
                        <FaClock className="mr-2 text-primary" />
                        Total hours of Completed Visits:{" "}
                        {totalHoursOfCompletedVisits.toFixed(2)}
                      </h4>
                    </div>
                  </Row>
                </div>

                <div>
                  <Row className="align-items-center">
                    <div className="col">
                      <h4 className="mb-0 d-flex align-items-center ">
                        <FaClock className="mr-2 text-primary" />
                        Total hours of all visits: {totalHours.toFixed(2)}
                      </h4>
                    </div>
                  </Row>
                </div>
              </div>
            </Card>

            <Card className="shadow mb-3">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Visits</h2>
                  </div>
                </Row>
              </CardHeader>

              <div>
                <div
                  style={{
                    background: "#f9f9f9",
                  }}
                  className="mx-3  rounded-lg  border border-gray-200   hover:shadow-lg hover:scale-105 transition-transform duration-200"
                >
                  <Polar data={data} options={options} />
                </div>
                <div className="mb-5"></div>

                {selectedCarer ? (
                  visitloading ? (
                    <div className="p-3">
                      <CustomSkeleton height="200px" width="100%" />
                    </div>
                  ) : visiterror ? (
                    <div className="p-3">
                      <h4>Error: {visiterror}</h4>
                    </div>
                  ) : visits.length > 0 ? (
                    <div sm="6">
                      {visits.map((visit) => (
                        <div
                          key={visit.id}
                          style={{
                            background: "#f9f9f9",
                          }}
                          className="pl-5 pr-5 mx-4 rounded-lg  border border-gray-200 p-3 mb-5 max-w-sm hover:shadow-lg hover:scale-105 transition-transform duration-200"
                        >
                          <h4 className="mb-2 text-gray-700">
                            Client Visit: Ashton Mapunga
                          </h4>
                          <h4 className="mb-2 text-gray-700">
                            Address: {visit.location.address}
                          </h4>
                          <h4 className="mb-2 text-gray-700">
                            Date of Visit: {visit.DateOfVisit}
                          </h4>

                          <Row className="align-items-center">
                            <div className="col">
                              <h4 className="mb-2 text-gray-700">
                                {visit.status}
                              </h4>
                            </div>
                            <div className="col text-right">
                              <Button
                                color="primary"
                                href="#pablo"
                                onClick={() => setOpen(true)}
                                size="sm"
                              >
                                View More
                              </Button>
                            </div>
                          </Row>

                          <Modal
                            title="Visit"
                            centered
                            open={open}
                            onOk={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                            width={1200}
                          >
                            <div className="border border-gray-400 rounded-lg p-4 mt-5">
                              <Tabs
                                defaultActiveKey="1"
                                items={[
                                  {
                                    key: "1",
                                    label: "Details",
                                    children: (
                                      <div>
                                        <h4 className="mb-2 text-gray-700">
                                          Client Visit: Ashton Mapunga
                                        </h4>
                                        <h4 className="mb-2 text-gray-700">
                                          Address: {visit.location.address}
                                        </h4>
                                        <h4 className="mb-2 text-gray-700">
                                          Date of Visit: {visit.DateOfVisit}
                                        </h4>
                                        <h4 className="mb-2 text-gray-700">
                                          Employee Name:{" "}
                                          {visit.careProfessionalId.firstName}
                                        </h4>
                                        <h4 className="mb-2 text-gray-700">
                                          Employee Email:{" "}
                                          {visit.careProfessionalId.email}
                                        </h4>
                                        <h4 className="mb-2 text-gray-700">
                                          Start Time: {visit.startTime}
                                        </h4>
                                        <h4 className="mb-2 text-gray-700">
                                          End Time: {visit.endTime}
                                        </h4>
                                        <h4 className="mb-2 text-gray-700">
                                          Status: {visit.status}
                                        </h4>

                                        <>
                                          <h4>
                                            Address: {visit?.location?.address}
                                          </h4>
                                          <div
                                            style={{
                                              height: "300px",
                                              width: "100%",
                                            }}
                                          >
                                            <MapContainer
                                              center={[
                                                visit?.location?.latitude,
                                                visit?.location?.longitude,
                                              ]}
                                              zoom={13}
                                              style={{
                                                height: "100%",
                                                width: "100%",
                                              }}
                                            >
                                              <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                              />
                                              <Marker
                                                position={[
                                                  visit?.location?.latitude,
                                                  visit?.location?.longitude,
                                                ]}
                                              >
                                                <Popup>
                                                  <strong>Location:</strong>{" "}
                                                  {visit?.location?.address}{" "}
                                                  <br />
                                                  <strong>
                                                    Latitude:
                                                  </strong>{" "}
                                                  {visit?.location?.latitude}{" "}
                                                  <br />
                                                  <strong>
                                                    Longitude:
                                                  </strong>{" "}
                                                  {visit?.location?.longitude}
                                                </Popup>
                                              </Marker>
                                            </MapContainer>
                                          </div>
                                        </>
                                      </div>
                                    ),
                                  },
                                  {
                                    key: "2",
                                    label: "Tasks",
                                    children: <TasksTab visitId={visit._id} />,
                                  },
                                  {
                                    key: "3",
                                    label: "Care Teams",
                                    children: (
                                      <div>
                                        <p>This is the first text in Tab 3.</p>
                                        <p>This is the second text in Tab 3.</p>
                                      </div>
                                    ),
                                  },
                                  {
                                    key: "4",
                                    label: "Observations",
                                    children: (
                                      <ObservationsTab visitId={visit._id} />
                                    ),
                                  },

                                  {
                                    key: "5",
                                    label: "Vitals",
                                    children: <VitalsTab visitId={visit._id} />,
                                  },
                                ]}
                                onChange={onChange}
                              />
                            </div>
                          </Modal>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-3">
                      <h4>No visits found for this carer.</h4>
                      <CustomNoData width="70px" height="70px" />
                    </div>
                  )
                ) : (
                  <div className="p-3">
                    <WarningComponent />
                  </div>
                )}
              </div>
            </Card>
          </Col>
          <Col xl="3">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Assessments</h2>
                  </div>
                </Row>
              </CardHeader>

              {selectedCarer ? (
                assessmentloading ? (
                  <div className="p-3">
                    <CustomSkeleton height="200px" width="100%" />
                  </div>
                ) : assessmenterror ? (
                  <div className="p-3">
                    <h4>Error: {assessmenterror}</h4>
                  </div>
                ) : assessments.length > 0 ? (
                  <div sm="6">
                    {assessments.map((assessment) => (
                      <div
                        key={assessment.id}
                        className="pl-3 pr-3 mx-2 bg-white rounded-lg shadow border border-gray-200 p-4 mb-5 max-w-sm hover:shadow-lg hover:scale-105 transition-transform duration-200"
                      >
                        <h4 className="mb-2 text-gray-700">
                          Question: {assessment.question}
                        </h4>
                        <h4 className="mb-2 text-gray-700">
                          Answer: {assessment.answer}
                        </h4>

                        <Row className="align-items-center">
                          <div className="col">
                            <h4 className="mb-2 text-gray-700">
                              {assessment.date}
                            </h4>
                          </div>
                          <div className="col text-right">
                            <Button
                              color="primary"
                              href="#pablo"
                              onClick={() => setOpenAssessments(true)}
                              size="sm"
                            >
                              View More
                            </Button>
                            <Modal
                              title="Assessments"
                              centered
                              open={openassessments}
                              onOk={() => setOpenAssessments(false)}
                              onCancel={() => setOpenAssessments(false)}
                              width={1200}
                            >
                              <div className="border border-gray-400 rounded-lg p-4">
                                <h4 className="mb-4">Assessments Done</h4>

                                <h4 className="mb-2 text-gray-700">
                                  Question: {assessment.question}
                                </h4>
                                <h4 className="mb-2 text-gray-700">
                                  Answer: {assessment.answer}
                                </h4>
                              </div>

                              <div className="border border-gray-400 rounded-lg p-4 mt-5">
                                <h4 className="mb-4">Make Assessments</h4>
                                <Tabs
                                  defaultActiveKey="1"
                                  items={items}
                                  onChange={onChange}
                                />
                              </div>
                            </Modal>
                          </div>
                        </Row>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3">
                    <h4>No assessments found for this carer.</h4>
                    <CustomNoData width="70px" height="70px" />
                  </div>
                )
              ) : (
                <div className="p-3">
                  <WarningComponent />
                </div>
              )}

              <Row className="align-items-center pl-3">
                <div className="col mt-4">
                  <h3 className="mb-0" style={{ color: "red" }}>
                    0 Expiring within 1 Month
                  </h3>
                </div>
              </Row>
            </Card>

            <Card className="shadow mt-3">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Family Members</h2>
                  </div>
                </Row>
              </CardHeader>

              <div className=" pl-3 pr-3 ">
                <h3 className="mb-0" style={{ color: "black" }}>
                  Tinashe Kasongo
                </h3>

                <h4 className="mb-2">Carers: Elliot Williams</h4>
                <h4 className="mb-2">Occured: 09/12/2020</h4>
              </div>
            </Card>
          </Col>
        </Row>

        <Modal
          title="Delete Carer"
          visible={isDeleteModalOpen}
          onOk={handleConfirmDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
          okText="Delete"
          okButtonProps={{ danger: true }}
        >
          {deleteloading && <CustomSpin />}
          {!deleteloading && <p>Are you sure you want to delete this carer?</p>}
        </Modal>
      </Container>
    </>
  );
};

export default MyCarer;
