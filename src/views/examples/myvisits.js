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
import AddCarerService from "services/carer_services/add_new_carer_service";
import CarerService from "services/carer_services/carer_service";
import ClientService from "services/client_services/client_services";
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
import {
  CloseOutlined,
  CheckOutlined,
  FileTextOutlined,
  CaretDownOutlined,
  CalendarOutlined,
  CalendarCheckOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  WarningOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
  UserOutlined,
  CoffeeOutlined,
  ScheduleOutlined,
  UserSwitchOutlined,
  UnorderedListOutlined,
  AppstoreOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

import { Alert } from "antd";

import { showMessage } from "helper/feedback_message_helper";
import CustomSpin from "components/customised_spins/customised_sprin";
import EditVisit from "./visit_templates/edit_visit";
import VisitDetailsModal from "./visit_templates/view_visit";
import { TimePicker } from "antd";

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
  const [carers, setCarers] = useState([]);
  const [clients, setClients] = useState([]);
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
  const [loading, setLoading] = useState(true);

  const [selectedCarerid, setSelectedCarerid] = useState(null);

  const handleSelectCarerid = (carerId) => {
    setSelectedCarerid(carerId);
  };

  const [selectedClientid, setSelectedClientid] = useState(null);
  const handleSelectClientid = (clientId) => {
    setSelectedClientid(clientId);
  };

  useEffect(() => {
    const fetchClients = async () => {
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
        clientId: values.client,
        careProfessionalId: values.carepro,
        DateOfVisit: "2024-12-15",
        amount_paid_per_hour: values.amount_paid_per_hour,
        startTime: values.startTime,
        endTime: values.endTime,
        status: values.status,
        location: {
          latitude: 39.7749,
          longitude: -182.4194,
          address: values.address,
        },
        officialVisitTime: values.officialVisitTime,
        officialEndTime: values.officialEndTime,
        description: values.description,
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
      console.error("Error adding visit:", error);
      showMessage("error", "Something went wrong!");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <>
      <Container className="mt--7 bg-white shadow-lg rounded-lg" fluid>
        <Drawer
          title={
            <span className="text-lg font-semibold">Create a new visit</span>
          }
          width={720}
          onClose={onClose}
          open={open}
          styles={{
            body: {
              paddingBottom: 80,
            },
            header: {
              borderBottom: "1px solid #f0f0f0",
              padding: "16px 24px",
            },
          }}
          extra={
            <Space>
              <Button onClick={onClose} icon={<CloseOutlined />}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                type="primary"
                icon={<CheckOutlined />}
                className="bg-emerald-600 hover:bg-emerald-700 border-0"
              >
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
                  {/* <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                      {
                        required: true,
                        message: "Please enter title",
                      },
                    ]}
                  >
                    <Input
                      prefix={<FileTextOutlined className="text-gray-400" />}
                      placeholder="Please enter title"
                      className="rounded-md"
                    />
                  </Form.Item> */}
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="carepro"
                    label="Select Care Professional"
                    rules={[
                      {
                        required: true,
                        message: "Please select a care professional",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select care professional"
                      className="rounded-md"
                      suffixIcon={
                        <CaretDownOutlined className="text-gray-400" />
                      }
                      dropdownStyle={{ borderRadius: "8px" }}
                      onChange={handleSelectCarerid}
                      value={selectedCarerid}
                    >
                      {carers.map((item) => (
                        <Option
                          key={item._id}
                          value={item._id}
                          onClick={() => handleSelectCarerid(item._id)}
                        >
                          <UserOutlined className="mr-2 text-blue-500" />{" "}
                          {item.firstName}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="client"
                    label="Select Client"
                    rules={[
                      {
                        required: true,
                        message: "Please select a Client",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select client"
                      className="rounded-md"
                      suffixIcon={
                        <CaretDownOutlined className="text-gray-400" />
                      }
                      dropdownStyle={{ borderRadius: "8px" }}
                      onChange={handleSelectClientid}
                      value={selectedClientid}
                    >
                      {clients.map((item) => (
                        <Option
                          key={item._id}
                          value={item._id}
                          onClick={() => handleSelectClientid(item._id)}
                        >
                          <UserOutlined className="mr-2 text-blue-500" />{" "}
                          {item.firstName} {item.lastName}
                        </Option>
                      ))}
                    </Select>
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
                    <Select
                      placeholder="Please select status"
                      className="rounded-md"
                      suffixIcon={
                        <CaretDownOutlined className="text-gray-400" />
                      }
                      dropdownStyle={{ borderRadius: "8px" }}
                    >
                      <Option value="Scheduled">
                        <CalendarOutlined className="mr-2 text-blue-500" />{" "}
                        Scheduled
                      </Option>
                      <Option value="Ongoing">
                        <SyncOutlined spin className="mr-2 text-purple-500" />{" "}
                        Ongoing
                      </Option>
                      <Option value="Completed">
                        <CheckCircleOutlined className="mr-2 text-green-500" />{" "}
                        Completed
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="DateOfVisit"
                    label="Date of Visit"
                    rules={[
                      {
                        required: true,
                        message: "Please select the date of visit",
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="Select date of visit"
                      style={{ width: "100%" }}
                      className="rounded-md"
                      suffixIcon={
                        <CalendarOutlined className="text-gray-400" />
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="amount_paid_per_hour"
                    label="Amount Paid Per Hour"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the amount paid per hour",
                      },
                    ]}
                  >
                    <Input
                      type="number"
                      placeholder="Enter amount per hour"
                      min={0}
                      prefix={<DollarOutlined className="text-gray-400" />}
                      className="rounded-md"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="officialVisitTime"
                    label="Official Visit Time"
                    rules={[
                      {
                        required: true,
                        message: "Please select the official visit time",
                      },
                    ]}
                  >
                    <TimePicker
                      placeholder="Select visit time"
                      style={{ width: "100%" }}
                      format="HH:mm"
                      className="rounded-md"
                      suffixIcon={
                        <ClockCircleOutlined className="text-gray-400" />
                      }
                    />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    name="officialEndTime"
                    label="Official End Time"
                    rules={[
                      {
                        required: true,
                        message: "Please select the official end time",
                      },
                    ]}
                  >
                    <TimePicker
                      placeholder="Select end time"
                      style={{ width: "100%" }}
                      format="HH:mm"
                      className="rounded-md"
                      suffixIcon={
                        <ClockCircleOutlined className="text-gray-400" />
                      }
                    />
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
                    <Input
                      placeholder="Please enter address"
                      prefix={<EnvironmentOutlined className="text-gray-400" />}
                      className="rounded-md"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="startTime"
                    label="Start Time"
                    rules={[
                      {
                        required: true,
                        message: "Please select the start time",
                      },
                    ]}
                  >
                    <TimePicker
                      placeholder="Select start time"
                      style={{ width: "100%" }}
                      format="HH:mm"
                      className="rounded-md"
                      suffixIcon={
                        <ClockCircleOutlined className="text-gray-400" />
                      }
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
                        message: "Please select the end time",
                      },
                    ]}
                  >
                    <TimePicker
                      placeholder="Select end time"
                      style={{ width: "100%" }}
                      format="HH:mm"
                      className="rounded-md"
                      suffixIcon={
                        <ClockCircleOutlined className="text-gray-400" />
                      }
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
                      rows={4}
                      placeholder="Please enter description"
                      className="rounded-md"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
        </Drawer>

        <Row className="mt-5">
          <Col xl="4">
            <Card className="shadow-md rounded-lg overflow-hidden border-0">
              <CardHeader className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0 font-semibold flex items-center">
                      <CalendarOutlined className="mr-2 text-blue-500" />{" "}
                      Assigned Visits
                    </h3>
                  </div>
                  <Button
                    onClick={showDrawer}
                    type="primary"
                    className="bg-emerald-600 hover:bg-emerald-700 rounded-full border-0 flex items-center"
                    icon={<PlusOutlined />}
                  >
                    Add Visit
                  </Button>
                </Row>
                <Row className="align-items-center">
                  <div className="col mt-4">
                    <h3 className="mb-0 font-medium flex items-center text-red-500">
                      <WarningOutlined className="mr-2" /> 8 Required
                    </h3>
                  </div>
                </Row>
              </CardHeader>
              <Table
                className="align-items-center table-flush"
                responsive
                pagination={false}
                rowClassName="hover:bg-gray-50 transition-colors"
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="font-medium">
                      Description
                    </th>
                    <th scope="col" className="font-medium">
                      Carers
                    </th>
                    <th scope="col" className="font-medium">
                      Client
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="font-normal flex items-center">
                      <MedicineBoxOutlined className="mr-2 text-teal-500" />{" "}
                      Cleaning the Patient
                    </th>
                    <td className="flex items-center">
                      <TeamOutlined className="mr-2 text-blue-500" /> 2 Carers
                    </td>
                    <td className="flex items-center">
                      <UserOutlined className="mr-2 text-purple-500" /> Peter
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="font-normal flex items-center">
                      <MedicineBoxOutlined className="mr-2 text-teal-500" />{" "}
                      Give Medication
                    </th>
                    <td className="flex items-center">
                      <UserOutlined className="mr-2 text-blue-500" /> 1 Carer
                    </td>
                    <td className="flex items-center">
                      <UserOutlined className="mr-2 text-purple-500" /> Trymore
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="font-normal flex items-center">
                      <CoffeeOutlined className="mr-2 text-teal-500" /> Food
                      Preparation
                    </th>
                    <td className="flex items-center">
                      <TeamOutlined className="mr-2 text-blue-500" /> 2 Carers
                    </td>
                    <td className="flex items-center">
                      <UserOutlined className="mr-2 text-purple-500" /> Gift
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
            <Card className="shadow-md mt-3 rounded-lg overflow-hidden border-0">
              <CardHeader className="border-0 bg-gradient-to-r from-green-50 to-teal-50">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0 font-semibold flex items-center">
                      <CheckCircleOutlined className="mr-2 text-green-500" />{" "}
                      Finished Visits
                    </h3>
                  </div>
                </Row>
              </CardHeader>

              <div className="pl-4 py-3">
                <h4 className="mb-2 flex items-center text-gray-700">
                  <ClockCircleOutlined className="mr-2 text-amber-500" />{" "}
                  Required Hours:
                  <span className="ml-2 font-semibold">1435h.35m</span>
                </h4>
                <h4 className="mb-2 flex items-center text-gray-700">
                  <ScheduleOutlined className="mr-2 text-blue-500" /> Booked
                  Hours:
                  <span className="ml-2 font-semibold">543h.32m</span>
                </h4>
                <h4 className="mb-2 flex items-center text-gray-700">
                  <TeamOutlined className="mr-2 text-purple-500" /> Carers
                  working this week:
                  <span className="ml-2 font-semibold">7</span>
                </h4>
                <h4 className="mb-2 flex items-center text-gray-700">
                  <UserSwitchOutlined className="mr-2 text-green-500" /> Number
                  of active carers:
                  <span className="ml-2 font-semibold">23</span>
                </h4>
                <h4 className="mb-3 mt-3">
                  <Button
                    type="link"
                    className="p-0 flex items-center text-blue-500 hover:text-blue-700"
                  >
                    <UnorderedListOutlined className="mr-1" /> View All
                  </Button>
                </h4>
              </div>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow-md rounded-lg overflow-hidden border-0">
              <CardHeader className="border-0 bg-gradient-to-r from-indigo-50 to-purple-50">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0 font-semibold flex items-center">
                      <AppstoreOutlined className="mr-2 text-indigo-500" /> All
                      Visits
                    </h3>
                  </div>
                </Row>
              </CardHeader>
              <Row className="align-items-center px-4 py-3 border-b border-gray-100">
                <div className="col">
                  <h4 className="mb-0 flex items-center text-blue-500">
                    <SearchOutlined className="mr-1" /> Search visit
                  </h4>
                </div>
                <div className="col text-right">
                  <Search
                    placeholder="10:20 - 11:30"
                    enterButton={
                      <Button type="primary" icon={<SearchOutlined />}>
                        Go
                      </Button>
                    }
                    size="large"
                    suffix={suffix}
                    onSearch={onSearch}
                    className="rounded-lg overflow-hidden"
                  />
                </div>
              </Row>

              <Table
                className="align-items-center table-flush"
                responsive
                rowClassName="hover:bg-gray-50 transition-colors"
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="font-medium">
                      Location
                    </th>
                    <th scope="col" className="font-medium">
                      Date of Visit
                    </th>
                    <th scope="col" className="font-medium">
                      Visit Status
                    </th>

                    <th scope="col" className="font-medium">
                      Start Time
                    </th>
                    {/* <th scope="col" className="font-medium">
                      End Time
                    </th> */}
                    <th scope="col" className="font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
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
                      <td>
                        <CustomSkeleton height="200px" width="100%" />
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={7} className="text-center py-4">
                        <Alert
                          message="Error"
                          description={error}
                          type="error"
                          showIcon
                        />
                      </td>
                    </tr>
                  ) : visits.length > 0 ? (
                    visits.map((visit) => (
                      <tr key={visit._id} style={{ cursor: "pointer" }}>
                        <th scope="row">
                          <div className="flex items-center">
                            <EnvironmentOutlined className="mr-2 text-red-500" />
                            {visit.location.address}
                          </div>
                        </th>
                        <th scope="row">
                          <div className="flex items-center">
                            <CalendarOutlined className="mr-2 text-blue-500" />
                            {visit.DateOfVisit}
                          </div>
                        </th>
                        <th scope="row">
                          <div
                            className="flex items-center px-2 py-1 rounded-full"
                            style={{
                              color: "white",
                              backgroundColor:
                                visit.status === "Scheduled"
                                  ? "#3B82F6"
                                  : visit.status === "Ongoing"
                                  ? "#8B5CF6"
                                  : visit.status === "Completed"
                                  ? "#10B981"
                                  : "#6B7280",
                            }}
                          >
                            {visit.status === "Scheduled" && (
                              <CalendarOutlined className="mr-1" />
                            )}
                            {visit.status === "Ongoing" && (
                              <SyncOutlined spin className="mr-1" />
                            )}
                            {visit.status === "Completed" && (
                              <CheckCircleOutlined className="mr-1" />
                            )}
                            {visit.status}
                          </div>
                        </th>

                        <th scope="row">
                          <div className="flex items-center">
                            <ClockCircleOutlined className="mr-2 text-green-500" />
                            {visit.startTime}
                          </div>
                        </th>
                        {/* <th scope="row">
                          <div className="flex items-center">
                            <ClockCircleOutlined className="mr-2 text-red-500" />
                            {visit.endTime}
                          </div>
                        </th> */}

                        <th scope="row">
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleMoreDetails(visit)}
                              type="primary"
                              icon={<EyeOutlined />}
                              className="bg-green-500 hover:bg-green-600 border-0 rounded-md"
                            >
                              View
                            </Button>
                            <Button
                              type="primary"
                              icon={<EditOutlined />}
                              className="bg-blue-500 hover:bg-blue-600 border-0 rounded-md"
                              onClick={() => handleOpenDrawer(visit)}
                            >
                              Edit
                            </Button>
                            <Button
                              type="primary"
                              danger
                              icon={<DeleteOutlined />}
                              className="rounded-md"
                              onClick={() => handleDeleteClick(visit._id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </th>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="text-center py-8">
                        <CustomNoData width="100px" height="100px" />
                        <p className="mt-3 text-gray-500">No visits found</p>
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
                title={
                  <span className="flex items-center text-red-500">
                    <ExclamationCircleOutlined className="mr-2" /> Delete Visit
                  </span>
                }
                visible={isDeleteModalOpen}
                onOk={handleConfirmDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
                okText="Delete"
                okButtonProps={{ danger: true, icon: <DeleteOutlined /> }}
                cancelButtonProps={{ icon: <CloseOutlined /> }}
                className="rounded-lg overflow-hidden"
              >
                {deleteloading && <CustomSpin />}
                {!deleteloading && (
                  <Alert
                    message="Warning"
                    description="Are you sure you want to delete this visit? This action cannot be undone."
                    type="warning"
                    showIcon
                    className="mb-4"
                  />
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
