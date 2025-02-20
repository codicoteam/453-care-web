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
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { MdPreview } from "react-icons/md";

import {
  DatePicker,
  Drawer,
  Form,
  Input,
  Switch,
  Select,
  Space,
  message,
} from "antd";
import AddCarerService from "services/carer_services/add_new_carer_service";
import { showMessage } from "helper/feedback_message_helper";
import CustomSpin from "components/customised_spins/customised_sprin";
import ClientService from "services/client_services/client_services";
import WarningComponent from "components/customersed_warning/warning_component";
import FamilyService from "services/familymember_services/family_services";
import AddFamilyMemberDialog from "./familymember_templates/addclient_family_member";
import { SlOptions } from "react-icons/sl";

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

const MyClient = () => {
  const [clients, setClients] = useState([]);
  const [visits, setVisits] = useState([]);
  const [family, setFamily] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visitloading, setVisitLoading] = useState(true);
  const [familyloading, setFamilyLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visiterror, setVisitError] = useState(null);
  const [familyrror, setFamilyError] = useState(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      console.log("services client calling");

      try {
        const response = await ClientService.getAllClient();
        setClients(response.data || []);
      } catch (err) {
        setError(err.message || "Error fetching clients");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchVisit = async () => {
      if (!selectedClient) {
        return;
      }

      setVisitLoading(true); // Show loading state
      try {
        const visitss = await VisitsService.getAllVisitsByClientId(
          selectedClient._id
        );
        console.log("selectedcleint id ", selectedClient._id);

        setVisits(visitss.data || []); // Update visits state
        console.log("vists date of visit", visits);
      } catch (err) {
        setVisitError(err.message || "Error fetching visits"); // Handle error
      } finally {
        setVisitLoading(false); // Hide loading state
      }
    };

    fetchVisit();
  }, [selectedClient]); // Run when selectedCarer changes

  useEffect(() => {
    const fetchFamilyMember = async () => {
      if (!selectedClient) {
        return;
      }

      setFamilyLoading(true); // Show loading state
      try {
        const familyy = await FamilyService.getAllMembers(selectedClient._id);
        console.log("selectedcleint id ", selectedClient._id);

        setFamily(familyy.data || []); // Update visits state
        console.log("vists date of family", familyy);
      } catch (err) {
        setFamilyError(err.message || "Error fetching family member"); // Handle error
      } finally {
        setFamilyLoading(false); // Hide loading state
      }
    };

    fetchFamilyMember();
  }, [selectedClient]); // Run when selectedCarer changes

  const handleSelectClient = (client) => {
    setSelectedClient(client);
  };

  const [opend, setOpend] = useState(false);
  const showDrawer = () => {
    setOpend(true);
  };
  const onClose = () => {
    setOpend(false);
  };

  const [openf, setOpenf] = useState(false);
  const showDrawerf = () => {
    setOpenf(true);
  };
  const onClosef = () => {
    setOpenf(false);
  };

  const [form] = Form.useForm();
  const [addloading, setAddLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("adding client");

      const clientData = {
        firstName: values.firstname,
        lastName: values.lastname,
        gender: values.gender,
        allergies: ["Peanuts", "Dust"],
        email: values.email,
        familyMemberIds: [],
        medicalHistory: [
          {
            condition: "Hypertension",
            startDate: "2021-01-01",
            status: "Chronic",
          },
        ],

        medicalAidInfo: values.medicalAidInfo,
        profilePicture: "djhedhuieuidfiufbeifbeiu",
        dateOfBirth: "djhedhuieuidfiufbeifbeiu",

        contactNumber: values.contactnumber,
        address: values.address,

        password: "secureygyuguyguPahgffhgssword123", // Example static value
      };
      console.log(clientData);

      setAddLoading(true);
      await ClientService.postClient(clientData);
      showMessage("success", "Login successfully!");

      form.resetFields();
      onClose();
    } catch (error) {
      showMessage("error", error || "Something went wrong!");
    } finally {
      setAddLoading(false);
    }
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleAddFamilyMember = async (data) => {
    try {
      const response = await FamilyService.postTask(data);
      console.log("Family member added successfully:", response);
      // Optionally, refresh the family members list or show a success message
    } catch (error) {
      console.error("Error adding family member:", error);
      // Optionally, show an error message
    }
  };

  return (
    <>
      <Container className="mt--7 bg-white" fluid>
        <Drawer
          title="Add a new Client"
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
                    name="gender"
                    label="Gender"
                    rules={[
                      {
                        required: true,
                        message: "Please choose gender",
                      },
                    ]}
                  >
                    <Select placeholder="Please choose gender">
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="allergies"
                    label="Allergies"
                    rules={[
                      {
                        required: true,
                        message: "Please enter allergies",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={4} // You can adjust the number of rows as needed
                      placeholder="Please enter allergies"
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="dateOfBirth" // Changed name to use camelCase, since it's more common in JS
                    label="Date Of Birth"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your Date of Birth",
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="Please select Date of Birth"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="medicalAidInfo"
                    label="Medical Aid Info"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="Please enter medical aid info"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="medicalHistory"
                    label="Medical History"
                    rules={[
                      {
                        required: false, // You can change to 'true' if this is a required field
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="Please enter medical history"
                    />
                  </Form.Item>
                </Col>
              </Row>

              {/* Add Family Member IDs Field with Reduced Size */}
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="familyMemberIds"
                    label="Family Member IDs"
                    rules={[
                      {
                        required: false, // You can change to 'true' if this is a required field
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={2} // Reduced the number of rows for a smaller field
                      placeholder="Please enter family member IDs (comma separated)"
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
                  Add New Client
                </Button>
                <Row className="align-items-center"></Row>
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
                      <div className="row bg-blue align-items-center p-3 ">
                        <div className="mb-2">
                          <Input placeholder="Search Carers" />
                        </div>
                        <div>
                          <Input placeholder="Active" />
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
                  ) : clients.length > 0 ? (
                    clients.map((client) => (
                      <tr
                        key={client._id}
                        onClick={() => handleSelectClient(client)}
                        style={{ cursor: "pointer" }}
                      >
                        <th scope="row">
                          <div className="row">
                            <div className="mr-2">{client.firstName}</div>
                            <div>{client.lastName}</div>
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
                    <h2 className="mb-0">Client Details</h2>
                  </div>
                </Row>
              </CardHeader>
              {selectedClient ? (
                <div className="p-3">
                  <h4>First Name: {selectedClient.firstName}</h4>
                  <h4>Last Name: {selectedClient.lastName}</h4>
                  <h4>Email: {selectedClient.email}</h4>
                  <h4>Phone: {selectedClient.contactNumber}</h4>
                  <h4>Address: {selectedClient.address}</h4>
                  <h4>Medical Aid Info: {selectedClient.medicalAidInfo}</h4>
                  <h4>
                    Medical History Status:{" "}
                    {selectedClient.medicalHistory.status}
                  </h4>
                  <h4>
                    Medical History Condition:{" "}
                    {selectedClient.medicalHistory.condition}
                  </h4>
                  <h4>Gender: {selectedClient.gender}</h4>
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
                    <h2 className="mb-0">Visits</h2>
                  </div>
                </Row>
              </CardHeader>
              {visitloading ? (
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
                      className="pl-3 pr-3 mx-2 bg-white rounded-lg shadow border border-gray-200 p-4 mb-5 max-w-sm hover:shadow-lg hover:scale-105 transition-transform duration-200"
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
                          <h4 className="mb-2 text-gray-700">{visit.status}</h4>
                        </div>
                        <div className="col text-right">
                          <div className="col text-right">
                            <MdPreview
                              size={24} // Adjust the size as needed
                              style={{ cursor: "pointer", color: "primary" }} // Style the icon
                              onClick={() => setOpen(true)} // Attach the onClick handler
                            />
                          </div>
                          <Modal
                            title="Visit"
                            centered
                            open={open}
                            onOk={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                            width={700}
                          >
                            <h4 className="mb-2 text-gray-700">
                              Employee Visit: Ashton Mapunga
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
                              Employee Email: {visit.careProfessionalId.email}
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
                          </Modal>
                        </div>
                      </Row>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3">
                  <h4>No visits found for this client.</h4>
                  <CustomNoData width="70px" height="70px" />
                </div>
              )}
            </Card>

            <Card className="shadow mb-3">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Diary summary</h2>
                  </div>
                </Row>
              </CardHeader>
              <div className="mb-3">
                <Row className="align-items-center pl-3 pr-4">
                  <div className="col">
                    <h2 className="mb-0" style={{ color: "blue" }}>
                      This week
                    </h2>
                  </div>
                  <div className="col text-right"></div>
                </Row>
                <div className="pl-3 mb-3">
                  <h4 className="mb-1">
                    2 Handover note generated via Mobile app
                  </h4>
                  <h4 className="mb-1">1 General</h4>
                </div>
              </div>
              <div className="mb-3">
                <Row className="align-items-center pl-3 pr-4">
                  <div className="col">
                    <h2 className="mb-0" style={{ color: "blue" }}>
                      Last week
                    </h2>
                  </div>
                  <div className="col text-right"></div>
                </Row>
                <div className="pl-3 mb-3">
                  <h4 className="mb-1">
                    3 Handover note generated via Mobile app
                  </h4>
                </div>
              </div>
              <div className="mb-3">
                <Row className="align-items-center pl-3 pr-4">
                  <div className="col">
                    <h2 className="mb-0" style={{ color: "blue" }}>
                      Last Month
                    </h2>
                  </div>
                  <div className="col text-right"></div>
                </Row>
                <div className="pl-3 mb-3">
                  <h4 className="mb-1">
                    2 Handover note generated via Mobile app
                  </h4>
                </div>
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
              <div className="pl-3 pr-3 mx-2 bg-white rounded-lg shadow border border-gray-200 p-4 mb-5 max-w-sm hover:shadow-lg hover:scale-105 transition-transform duration-200">
                <h4 className="mb-2 text-gray-700">
                  Question : What is your name
                </h4>
                <h4 className="mb-2 text-gray-700">Answer : Ashton Mapunga</h4>

                <Row className="align-items-center">
                  <div className="col"></div>
                  <div className="col text-right">
                    <div className="col text-right">
                      <MdPreview
                        size={24} // Adjust the size as needed
                        style={{ cursor: "pointer", color: "primary" }} // Style the icon
                        onClick={(e) => e.preventDefault()}
                      />
                    </div>
                  </div>
                </Row>
              </div>
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
                  {selectedClient && (
                    <div className="col text-right">
                      <Button
                        style={{
                          backgroundColor: "green",
                          color: "white",
                          border: "none",
                        }}
                        size="sm"
                        onClick={toggleDialog}
                      >
                        Add Family Member
                      </Button>
                    </div>
                  )}
                </Row>
              </CardHeader>

              {selectedClient && (
                <AddFamilyMemberDialog
                  isOpen={isDialogOpen}
                  toggle={toggleDialog}
                  onAdd={handleAddFamilyMember}
                  selectedClient={selectedClient}
                />
              )}

              {familyloading ? (
                <div className="p-3">
                  <CustomSkeleton height="200px" width="100%" />
                </div>
              ) : familyrror ? (
                <div className="p-3">
                  <h4>Error: {familyrror}</h4>
                </div>
              ) : family.length > 0 ? (
                <div sm="6">
                  {family.map((famil) => (
                    <div
                      key={famil.id}
                      className="ml-3 mr-3"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "13px",
                        background: "#f9f9f9",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        margin: "16px 0",
                      }}
                    >
                      {/* Avatar */}
                      <Avatar
                        shape="square"
                        size={64}
                        icon={<UserOutlined />}
                      />

                      {/* Profile Details */}
                      <div className="pl-3 pr-3" style={{ marginLeft: "16px" }}>
                        <h3 className="mb-0" style={{ color: "black" }}>
                          {famil.relationshipToClient}
                        </h3>
                        <h4>Name: {famil.firstName}</h4>

                        <Row className="align-items-center">
                          <div className="col">
                            <h4 className="mb-2">{famil.contactNumber}</h4>
                          </div>
                          <div className="col text-right">
                            <div className="col text-right">
                              <MdPreview
                                size={24} // Adjust the size as needed
                                style={{ cursor: "pointer", color: "primary" }} // Style the icon
                                onClick={() => setOpenf(true)} // Attach the onClick handler
                              />
                            </div>
                            <Modal
                              title="Visit"
                              centered
                              open={openf}
                              onOk={() => setOpenf(false)}
                              onCancel={() => setOpenf(false)}
                              width={700}
                            >
                              <h4 className="mb-2 text-gray-700">
                                First Name: {famil.firstName}
                              </h4>
                              <h4 className="mb-2 text-gray-700">
                                Last Name: {famil.lastName}
                              </h4>
                              <h4 className="mb-2 text-gray-700">
                                Relationship To Client:{" "}
                                {famil.relationshipToClient}
                              </h4>
                              <h4 className="mb-2 text-gray-700">
                                Email: {famil.email}
                              </h4>
                              <h4 className="mb-2 text-gray-700">
                                Profile Picture : {famil.profilePicture}
                              </h4>
                              <h4 className="mb-2 text-gray-700">
                                Contact Number: {famil.contactNumber}
                              </h4>
                              <h4 className="mb-2 text-gray-700">
                                Password: {famil.password}
                              </h4>
                            </Modal>
                          </div>
                        </Row>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3">
                  <h4>No visits found for this client.</h4>
                  <CustomNoData width="70px" height="70px" />
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyClient;
