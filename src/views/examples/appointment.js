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
import AppointmentService from "services/appointments_service/appointments_service";
import AppoitmentDetailsModal from "./appoitnment_template/view_apointment";

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

const MyAppointments = () => {
  const [appointments, setAPpointment] = useState([]);
  const [Appointmentloading, setAppointmentLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointmenterror, setAppointmentError] = useState(null);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openAppointmentdetails, setOpenAppointmentDetails] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [deleteloading, setDeleteLoading] = useState(false);

  const handleOpenDrawer = (appointment) => {
    setSelectedAppointment(appointment);
    setDrawerOpen(true);
  };

  const handleMoreDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenAppointmentDetails(true);
  };

  const handleCloseDrawer = () => {
    setSelectedAppointment(null);
    setDrawerOpen(false);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const handleDeleteClick = (appointmentid) => {
    setSelectedAppointmentId(appointmentid);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await AppointmentService.deleteAppointmentById(selectedAppointmentId);
      showMessage("success", "Visit successfully deleted!");
      setAPpointment((prevAppointment) =>
        prevAppointment.filter((appointment) => appointment._id !== selectedAppointmentId)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      showMessage("Something went wrong!");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await AppointmentService.getAllAppointments();
        setAPpointment(response.data || []);
      } catch (err) {
        setError(err.message || "Error fetching appointments");
      } finally {
        setAppointmentLoading(false);
      }
    };

    fetchAppointment();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  
  return (
    <>
      <Container className="mt--7 bg-white" fluid>
      

        <Row className="mt-5">
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
               
                <Row className="align-items-center">
                  <div className="col mt-4">
                    <h3 className="mb-0" style={{ color: "red" }}>
                      8 Required
                    </h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Client Address</th>
                    <th scope="col"> Status</th>
                    <th scope="col"> Payment Status</th>
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
                    <h3 className="mb-0">All Appointments</h3>
                  </div>
                </Row>
              </CardHeader>
              <Row className="align-items-center pl-4 pr-4">
                <div className="col">
                  <h4 className="mb-0" style={{ color: "blue" }}>
                    Search Appointment{" "}
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
                  <th scope="col">Client Address</th>
                    <th scope="col"> Status</th>
                    <th scope="col"> Payment Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-violet">
                  {Appointmentloading ? (
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
                    
                    </tr>
                  ) : error ? (
                    <tr>
                      <td>Error: {error}</td>
                    </tr>
                  ) : appointments.length > 0 ? (
                    appointments.map((appointment) => (
                      <tr key={visit._id} style={{ cursor: "pointer" }}>
                        <th scope="row">
                          <div>{appointment.clientAddress.city}</div>
                        </th>
                        <th scope="row">
                          <div>{appointment.status}</div>
                        </th>
                        <th scope="row">
                          <div>{appointment.paymentStatus}</div>
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
              {selectedAppointment && (
                <AppoitmentDetailsModal
                  openAppointmentdetails={openAppointmentdetails}
                  setOpenAppointmentDetails={setOpenAppointmentDetails}
                  appointment={selectedAppointment}
                />
              )}

              <EditVisit
                open={isDrawerOpen}
                onClose={handleCloseDrawer}
                visit={selectedAppointment}
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

export default MyAppointments;
