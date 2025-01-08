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
import AlertContainer from "components/alertcontainer/primary_alert";
import SecondaryAlertContainer from "components/largealertcontainer/secondary_alert";
import CareRequistTable from "components/tables/carerequirest_table";
import { DatePicker, Drawer, Form, Select } from "antd";
import VisitsService from "services/visits_service/visits_service";
import { showMessage } from "helper/feedback_message_helper";
import CustomSpin from "components/customised_spins/customised_sprin";
import { useEffect, useState } from "react";
import CustomNoData from "components/nodata/no_data";
import CustomSkeleton from "components/skeletons/custom_skeleton";

const { Option } = Select;

const CareRequired = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const [open, setOpen] = useState(false);
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

      form.resetFields();
      onClose();
    } catch (error) {
      showMessage("Something went wrong!");
    } finally {
      setAddLoading(false);
    }
  };

  const [visits, setVisit] = useState([]);
  const [error, setError] = useState(null);
  const [visitloading, setVisitLoading] = useState(true);

  useEffect(() => {
    const fetchAllVisits = async () => {
      try {
        const response = await VisitsService.getAllVisits();
        setVisit(response.data || []);
      } catch (err) {
        setError(err.message || "Error fetching carers");
      } finally {
        setVisitLoading(false);
      }
    };

    fetchAllVisits();
  }, []);
  console.log(visits);

  return (
    <>
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Care Requried</h2>
                  </div>
                </Row>
              </CardHeader>
              <div className="px-4">
                <AlertContainer title="Care Type represent the care that you provide for clients eg Personal Care, Meal Preparation , you can assign the type ....." />
                <div className="my-4">
                  <SecondaryAlertContainer
                    message="Option Features"
                    description="Enable warning for care type"
                  />
                </div>
              </div>
              <Row className="align-items-center pl-4 pr-4 mb-4">
                <div className="col">
                  <Button color="success" variant="dashed" onClick={showDrawer}>
                    Add Care Type
                  </Button>

                  <></>
                </div>

                <Drawer
                  title="Create a new account"
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
                      <Button
                        onClick={handleSubmit}
                        type="primary"
                        color="success"
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
                              <Option value="Scheduled">Open</Option>
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
              </Row>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Care Type</th>
                    <th scope="col">Display in app</th>
                    <th scope="col">Address</th>

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
                    </tr>
                  ) : error ? (
                    <tr>
                      <td>Error: {error}</td>
                    </tr>
                  ) : visits.length > 0 ? (
                    visits.map((visit) => (
                      <tr key={visit._id} style={{ cursor: "pointer" }}>
                        <th scope="row">
                          <div>Food Preparation</div>
                        </th>
                        <th scope="row">
                          <div>Yes</div>
                        </th>
                        <th scope="row">
                          <div>{visit.location.address}</div>
                        </th>
                        <th scope="row">
                          <div className="row">
                            <div className="mr-2">
                              <PrimaryButton title="Edit" color = 'primary' variant = 'outlined' />
                            </div>
                            <div></div>
                            <div>
                              <PrimaryButton title="Delete" color = 'danger' variant = 'outlined' />
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
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CareRequired;
