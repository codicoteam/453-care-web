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
  CardHeader,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { AudioOutlined } from "@ant-design/icons";
import { Input, Space } from "antd";
import PrimaryButton from "components/buttons/primary_button";
import PharmacyService from "services/pharmacies_service/pharmacy_service";
import CustomSkeleton from "components/skeletons/custom_skeleton";
import { useEffect, useState } from "react";
import CustomNoData from "components/nodata/no_data";

import {
  DatePicker,
  Drawer,
  Modal,
  Form,
  Switch,
  Select,
  Divider,
  message,
} from "antd";
import { showMessage } from "helper/feedback_message_helper";
import CustomSpin from "components/customised_spins/customised_sprin";
import EditVisit from "./visit_templates/edit_visit";
import VisitDetailsModal from "./visit_templates/view_visit";
import { TimePicker } from "antd";
import { Checkbox } from "antd";

const { Search } = Input;
const { Option } = Select;
const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);

const MyPharmacy = () => {
  const [pharmacy, setPharmacy] = useState([]);
  const [pharmacyloading, setPharmacyLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visiterror, setVisitError] = useState(null);
  const [assessmenterror, setAssessmentError] = useState(null);
  const [open, setOpen] = useState(false);
  const [openassessments, setOpenAssessments] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openpharmacydetails, setOpenPharmacytDetails] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [deleteloading, setDeleteLoading] = useState(false);

  const handleOpenDrawer = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setDrawerOpen(true);
  };

  const handleMoreDetails = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setOpenPharmacytDetails(true);
  };

  const handleCloseDrawer = () => {
    setSelectedPharmacy(null);
    setDrawerOpen(false);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPharmacyId, setSelectedPharmacyId] = useState(null);

  const handleDeleteClick = (visitId) => {
    setSelectedPharmacyId(visitId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await PharmacyService.deleteVisitById(selectedPharmacyId);
      showMessage("success", "Pharmacy successfully deleted!");
      setPharmacy((prevPharmacies) =>
        prevPharmacies.filter((pharmacy) => pharmacy._id !== selectedPharmacyId)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      showMessage("Something went wrong!");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    const fetchpharmacies = async () => {
      console.log("print pharmacies");

      try {
        const response = await PharmacyService.getAllPharmacies();
        setPharmacy(response.data || []);
      } catch (err) {
        setError(err.message || "Error fetching pharmacies");
      } finally {
        setPharmacyLoading(false);
      }
    };

    fetchpharmacies();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();
  const [addloading, setAddLoading] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("adding pharmacy");

      const PharmacyData = {
        name: values.name,
        address: values.address,
        location: {
          latitude: values.latitude,
          longitude: values.longitude,
          address: values.address,
          coordinates: [values.longitude, values.latitude],
          type: "Point",
        },
        contact: {
          phone: values.phone,
          email: values.email,
          website: values.website,
        },
        logoImage: values.logoImage,
        openingHours: {
          monday: values.openingHours.monday,
          tuesday: values.openingHours.tuesday,
          wednesday: values.openingHours.wednesday,
          thursday: values.openingHours.thursday,
          friday: values.openingHours.friday,
          saturday: values.openingHours.saturday,
          sunday: values.openingHours.sunday,
        },
        services: values.services, // should be an array of strings
        is24Hours: values.is24Hours,
        licenseNumber: values.licenseNumber,
        owner: values.owner,
        medicines: values.medicines, // array of medicine IDs
        medicalAids: values.medicalAids, // array of aid providers
      };

      console.log(PharmacyData);

      setAddLoading(true);
      await PharmacyService.postPharmacy(PharmacyData);
      showMessage("success", "add pharmacy successfully!");

      const response = await PharmacyService.getAllPharmacies();
      setPharmacy(response.data || []);

      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Error adding pharmacy:", error);
      showMessage("error", "Something went wrong!");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <>
      <Container className="mt--7 bg-white" fluid>
        <Drawer
          title="Create a new pharmacy"
          width={720}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 80,
            },
          }}
          extra={
            <Space>
              <Button onClick={onClose}>Cancel</Button>
              <Button onClick={handleSubmit} type="primary" color="success">
                Submit
              </Button>
            </Space>
          }
        >
          {addloading && <CustomSpin />}
          {!addloading && (
            <Form layout="vertical" form={form} hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Pharmacy Name"
                    rules={[
                      { required: true, message: "Please enter pharmacy name" },
                    ]}
                  >
                    <Input placeholder="Enter pharmacy name" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                      { required: true, message: "Please enter address" },
                    ]}
                  >
                    <Input placeholder="Enter address" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="latitude"
                    label="Latitude"
                    rules={[
                      { required: true, message: "Please enter latitude" },
                    ]}
                  >
                    <Input type="number" placeholder="Enter latitude" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="longitude"
                    label="Longitude"
                    rules={[
                      { required: true, message: "Please enter longitude" },
                    ]}
                  >
                    <Input type="number" placeholder="Enter longitude" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                      { required: true, message: "Please enter phone number" },
                    ]}
                  >
                    <Input placeholder="Enter phone number" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: "Please enter email" }]}
                  >
                    <Input type="email" placeholder="Enter email" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="website" label="Website">
                    <Input placeholder="Enter website URL" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item name="logoImage" label="Logo Image URL">
                    <Input placeholder="Enter logo image URL" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="licenseNumber"
                    label="License Number"
                    rules={[
                      {
                        required: true,
                        message: "Please enter license number",
                      },
                    ]}
                  >
                    <Input placeholder="Enter license number" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="owner"
                    label="Owner Name"
                    rules={[
                      { required: true, message: "Please enter owner's name" },
                    ]}
                  >
                    <Input placeholder="Enter owner's name" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="services"
                    label="Services"
                    rules={[
                      { required: true, message: "Please select services" },
                    ]}
                  >
                    <Select
                      mode="tags"
                      placeholder="Enter or select services"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: "Please enter description",
                      },
                    ]}
                  >
                    <Input.TextArea
                      rows={4} // You can adjust the number of rows as needed
                      placeholder="Please enter description"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="is24Hours" valuePropName="checked">
                    <Checkbox>Open 24 Hours</Checkbox>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                {[
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                  "sunday",
                ].map((day) => (
                  <Col span={12} key={day}>
                    <Form.Item
                      name={["openingHours", day]}
                      label={`${
                        day.charAt(0).toUpperCase() + day.slice(1)
                      } Hours`}
                    >
                      <Input placeholder={`e.g. 08:00 - 18:00 or Closed`} />
                    </Form.Item>
                  </Col>
                ))}
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="medicines"
                    label="Medicine IDs"
                    rules={[
                      { required: true, message: "Please enter medicine IDs" },
                    ]}
                  >
                    <Select
                      mode="tags"
                      placeholder="Enter medicine IDs"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="medicalAids"
                    label="Medical Aids"
                    rules={[
                      { required: true, message: "Please enter medical aids" },
                    ]}
                  >
                    <Select
                      mode="tags"
                      placeholder="Enter supported medical aids"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
        </Drawer>

        <Row className="mt-5">
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0"> Pharmacies</h3>
                  </div>
                  <Button color="success" onClick={showDrawer} variant="dashed">
                    Add Pharmacy
                  </Button>
                </Row>
                {/* <Row className="align-items-center">
                  <div className="col mt-4">
                    <h3 className="mb-0" style={{ color: "red" }}>
                      8 Required
                    </h3>
                  </div>
                </Row> */}
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Description</th>
                    <th scope="col"> Carers</th>
                    <th scope="col"> Client</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Cleaning the Patient</th>
                    <td>2 Carers</td>
                    <td>Peter</td>
                  </tr>
                  <tr>
                    <th scope="row">Give Medication</th>
                    <td>1 Carer</td>
                    <td>Trymore</td>
                  </tr>
                  <tr>
                    <th scope="row">Food Preparation</th>
                    <td>2 Carer</td>
                    <td>Gift</td>
                  </tr>
                </tbody>
              </Table>
            </Card>
            <Card className="shadow mt-3">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Finished Visits</h3>
                  </div>
                </Row>
              </CardHeader>

              <div className="pl-3 mb-3">
                <h4 className="mb-1">Required Hours: 1435h.35m</h4>
                <h4 className="mb-1">Booked Hours: 543h.32m</h4>
                <h4 className="mb-1">Carers working this week: 7</h4>
                <h4 className="mb-1">Number of active carers: 23</h4>
                <h4 className="mb-2">Number of active carers: 23</h4>
                <h4 className="mb-1" style={{ color: "blue" }}>
                  View All
                </h4>
              </div>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">All Visits</h3>
                  </div>
                </Row>
              </CardHeader>
              <Row className="align-items-center pl-4 pr-4">
                <div className="col">
                  <h4 className="mb-0" style={{ color: "blue" }}>
                    Search pharmacy{" "}
                  </h4>
                </div>
                <div className="col text-right">
                  <Search
                    placeholder="10:20 - 11:30"
                    enterButton="Go"
                    size="large"
                    suffix={suffix}
                    onSearch={onSearch}
                  />
                </div>
              </Row>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Location</th>
                    <th scope="col">Working Hours</th>

                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-violet">
                  {pharmacyloading ? (
                    <tr>
                      <td>
                        <CustomSkeleton height="200px" width="100%" />
                      </td>
                      <td>
                        <CustomSkeleton height="200px" width="100%" />
                      </td>
                      <td>
                        <CustomSkeleton height="200px" width="100%" />
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td>Error: {error}</td>
                    </tr>
                  ) : pharmacy.length > 0 ? (
                    pharmacy.map((pharmacy) => (
                      <tr key={pharmacy._id} style={{ cursor: "pointer" }}>
                        <th scope="row">
                          <div>{pharmacy.location.address}</div>
                        </th>
                        <th scope="row">
                          <div>{pharmacy.DateOfVisit}</div>
                        </th>
                        <th scope="row">
                          <div
                            style={{
                              color:
                                pharmacy.status === "Scheduled"
                                  ? "blue"
                                  : pharmacy.status === "Ongoing"
                                  ? "purple"
                                  : pharmacy.status === "Completed"
                                  ? "green"
                                  : "inherit",
                            }}
                          >
                            {pharmacy.status}
                          </div>
                        </th>
                        <th scope="row">
                          <div>{pharmacy.description}</div>
                        </th>
                        <th scope="row">
                          <div>{pharmacy.startTime}</div>
                        </th>
                        <th scope="row">
                          <div>{pharmacy.endTime}</div>
                        </th>

                        <th scope="row">
                          <div className="row">
                            <div className="mr-2">
                              <PrimaryButton
                                onClick={() => handleMoreDetails(pharmacy)}
                                title="View"
                                color="success"
                                variant="outlined"
                              />
                            </div>

                            <div className="mr-2">
                              <PrimaryButton
                                title="Edit"
                                color="primary"
                                variant="outlined"
                                onClick={() => handleOpenDrawer(pharmacy)}
                              />
                            </div>
                            <div></div>
                            <div>
                              <PrimaryButton
                                title="Delete"
                                color="danger"
                                variant="outlined"
                                onClick={() => handleDeleteClick(pharmacy._id)}
                              />
                            </div>
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
              {selectedPharmacy && (
                <VisitDetailsModal
                  openvisitdetails={openpharmacydetails}
                  setOpenVisitDetails={setOpenPharmacytDetails}
                  pharmacy={selectedPharmacy}
                />
              )}

              <EditVisit
                open={isDrawerOpen}
                onClose={handleCloseDrawer}
                pharmacy={selectedPharmacy}
              />
              <Modal
                title="Delete Visit"
                visible={isDeleteModalOpen}
                onOk={handleConfirmDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
                okText="Delete"
                okButtonProps={{ danger: true }}
              >
                {deleteloading && <CustomSpin />}
                {!deleteloading && (
                  <p>Are you sure you want to delete this pharmacy?</p>
                )}
              </Modal>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyPharmacy;
