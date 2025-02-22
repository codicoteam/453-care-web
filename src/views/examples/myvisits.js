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
import VisitsService from "services/visits_service/visits_service";
import CustomSkeleton from "components/skeletons/custom_skeleton";
import { useEffect, useState } from "react";
import CustomNoData from "components/nodata/no_data";

import {
  DatePicker,
  Drawer,
  Modal,
  AutoComplete,
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

const MyVisits = () => {
  const [visits, setVisits] = useState([]);
  const [visitloading, setVisitLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visiterror, setVisitError] = useState(null);
  const [assessmenterror, setAssessmentError] = useState(null);
  const [open, setOpen] = useState(false);
  const [openassessments, setOpenAssessments] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openvisitdetails, setOpenVisitDetails] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [deleteloading, setDeleteLoading] = useState(false);

  const handleOpenDrawer = (visit) => {
    setSelectedVisit(visit);
    setDrawerOpen(true);
  };

  const handleMoreDetails = (visit) => {
    setSelectedVisit(visit);
    setOpenVisitDetails(true);
  };

  const handleCloseDrawer = () => {
    setSelectedVisit(null);
    setDrawerOpen(false);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVisitId, setSelectedVisitId] = useState(null);

  const handleDeleteClick = (visitId) => {
    setSelectedVisitId(visitId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await VisitsService.deleteVisitById(selectedVisitId);
      showMessage("success", "Visit successfully deleted!");
      setVisits((prevVisits) =>
        prevVisits.filter((visit) => visit._id !== selectedVisitId)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      showMessage("Something went wrong!");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    const fetchVisits = async () => {
      console.log("print visits");

      try {
        const response = await VisitsService.getAllVisits();
        setVisits(response.data || []);
      } catch (err) {
        setError(err.message || "Error fetching visits");
      } finally {
        setVisitLoading(false);
      }
    };

    fetchVisits();
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
      console.log("adding visit");

      const visitData = {
        clientId: "675eaa3279915a77996c8884",
        careProfessionalId: "6763fbc6d9c0556eaea94214",
        DateOfVisit: "2024-12-15",
        startTime: "2025-12-15T09:00:00Z",
        endTime: "2024-11-15T10:00:00Z",
        status: values.status,
        location: {
          latitude: 39.7749,
          longitude: -182.4194,
          address: values.address,
        },
        officialVisitTime: "",
        officialEndTime: "",
      };
      console.log(visitData);

      setAddLoading(true);
      await VisitsService.postVisit(visitData);
      showMessage("success", "add visit successfully!");

      const response = await VisitsService.getAllVisits();
      setVisits(response.data || []);

      form.resetFields();
      onClose();
    } catch (error) {
      showMessage("Something went wrong!");
    } finally {
      setAddLoading(false);
    }
  };


  const [options, setOptions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = (value) => {
    const filteredOptions = visits
      .filter((visit) => typeof visit.location === "string" && visit.location.toLowerCase().includes(value.toLowerCase()))
      .map((visit) => ({
        value: visit.location,
      }));
    setOptions(filteredOptions);
  };

  const onSelect = (value) => {
    const visit = visits.find((v) => v.location === value);
    if (visit) {
      setSelectedVisit(visit);
      setIsModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Container className="mt--7 bg-white" fluid>
        <Drawer
          title="Create a new visit"
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
                    name="title"
                    label="Title"
                    rules={[
                      {
                        required: true,
                        message: "Please enter title",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter title" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="status"
                    label="Status"
                    rules={[
                      {
                        required: true,
                        message: "Please select status",
                      },
                    ]}
                  >
                    <Select placeholder="Please select status">
                      <Option value="Scheduled">Scheduled</Option>
                      <Option value="Ongoing">Ongoing</Option>
                      <Option value="Completed">Completed</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="Working Time"
                    label="Working Time"
                    rules={[
                      {
                        required: true,
                        message: "Please choose the working time",
                      },
                    ]}
                  >
                    <DatePicker.RangePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>

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
                    <h3 className="mb-0"> Assigned Visits</h3>
                  </div>
                  <Button color="success" onClick={showDrawer} variant="dashed">
                    Add Visit
                  </Button>
                </Row>
              </CardHeader>
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
                    Search visit{" "}
                  </h4>
                </div>
                <div className="col text-right">
                  <AutoComplete
                    options={options}
                    onSearch={handleSearch}
                    onSelect={onSelect}
                    style={{ width: "100%" }}
                  >
                    <Search
                      placeholder="Search Visit"
                      enterButton="Search"
                      size="large"
                    />
                  </AutoComplete>

                  <Modal
                    title="Visit Details"
                    visible={isModalVisible}
                    onCancel={handleModalClose}
                    footer={null}
                  >
                    {selectedVisit && (
                      <div>
                        <p>
                          <strong>Location:</strong> {selectedVisit.location}
                        </p>
                        <p>
                          <strong>Date:</strong> {selectedVisit.date}
                        </p>
                        <p>
                          <strong>Details:</strong> {selectedVisit.details}
                        </p>
                      </div>
                    )}
                  </Modal>
                </div>
              </Row>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Location</th>
                    <th scope="col">Date of Visit</th>
                    <th scope="col">Visit Status</th>
                    <th scope="col">Start Time</th>

                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-violet">
                  {visitloading ? (
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
                  ) : visits.length > 0 ? (
                    visits.map((visit) => (
                      <tr key={visit._id} style={{ cursor: "pointer" }}>
                        <th scope="row">
                          <div>{visit.location.address}</div>
                        </th>
                        <th scope="row">
                          <div>{visit.DateOfVisit}</div>
                        </th>
                        <th scope="row">
                          <div
                            style={{
                              color:
                                visit.status === "Scheduled"
                                  ? "blue"
                                  : visit.status === "Ongoing"
                                  ? "purple"
                                  : visit.status === "Completed"
                                  ? "green"
                                  : "inherit",
                            }}
                          >
                            {visit.status}
                          </div>
                        </th>
                        <th scope="row">
                          <div>{visit.startTime}</div>
                        </th>
                        <th scope="row">
                          <div className="row">
                            <div className="mr-2">
                              <PrimaryButton
                                onClick={() => handleMoreDetails(visit)}
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
                                onClick={() => handleOpenDrawer(visit)}
                              />
                            </div>
                            <div></div>
                            <div>
                              <PrimaryButton
                                title="Delete"
                                color="danger"
                                variant="outlined"
                                onClick={() => handleDeleteClick(visit._id)}
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
              {selectedVisit && (
                <VisitDetailsModal
                  openvisitdetails={openvisitdetails}
                  setOpenVisitDetails={setOpenVisitDetails}
                  visit={selectedVisit}
                />
              )}

              <EditVisit
                open={isDrawerOpen}
                onClose={handleCloseDrawer}
                visit={selectedVisit}
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
                  <p>Are you sure you want to delete this visit?</p>
                )}
              </Modal>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyVisits;
