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
import TaskService from "services/task_service/task_service";
import EditTask from "./task_template/edit_task";

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

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [taksloading, setTasksLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openvisitdetails, setOpenVisitDetails] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteloading, setDeleteLoading] = useState(false);

  const handleOpenDrawer = (task) => {
    setSelectedTask(task);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setSelectedTask(null);
    setDrawerOpen(false);
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleDeleteClick = (taskId) => {
    setSelectedTaskId(taskId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await TaskService.deleteTasksById(selectedTaskId);
      showMessage("success", "Tasks successfully deleted!");
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== selectedTaskId)
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      showMessage("Something went wrong!");
    } finally {
      setDeleteLoading(false);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      console.log("print tasks");

      try {
        const response = await TaskService.getAllTask();
        setTasks(response.data || []);
      } catch (err) {
        setError(err.message || "Error fetching tasks");
      } finally {
        setTasksLoading(false);
      }
    };

    fetchTasks();
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

      const taskData = {
        name: values.name,
        description: values.description,
        visitId: "675efb52066f678498a2fee7",
        status: values.status,
        assignedBy: "675ebf0a6cd21d8db1a29697",
       
      };
      console.log(taskData);

      setAddLoading(true);
      await TaskService.postTask(taskData);
      showMessage("success", "add task successfully!");

      const response = await TaskService.getAllTask();
      setTasks(response.data || []);

      form.resetFields();
      onClose();
    } catch (error) {
      showMessage("Something went wrong!");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <>
      <Container className="mt--7" fluid>
        <Button color="success" onClick={showDrawer} variant="dashed">
          Add New Task
        </Button>

        <Drawer
          title="Create a new task"
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
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter name",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter name" />
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
                    name="description"
                    label="Description"
                    rules={[
                      {
                        required: true,
                        message: "Please enter description",
                      },
                    ]}
                  >
                    <Input placeholder="Please enter description" />
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
                    <h3 className="mb-0"> Assigned Tasks</h3>
                  </div>
                </Row>
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
                    Search visit{" "}
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
                    <th scope="col">Assigned By</th>
                    <th scope="col">Task Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-violet">
                  {taksloading ? (
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
                  ) : tasks.length > 0 ? (
                    tasks.map((task) => (
                      <tr key={task._id} style={{ cursor: "pointer" }}>
                        <th scope="row">
                          <div>{task.name}</div>
                        </th>
                        <th scope="row">
                          <div>Peter Tone</div>
                        </th>
                        <th scope="row">
                          <div
                            style={{
                              color:
                              task.status === "Pending"
                                  ? "blue"
                                  : task.status === "Completed"
                                  ? "green"
                                  : "inherit",
                            }}
                          >
                            {task.status}
                          </div>
                        </th>
                       
                        <th scope="row">
                          <div className="row">
                            <div className="mr-2">
                              <PrimaryButton
                                onClick={() => setOpenVisitDetails(true)}
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
                                onClick={() => handleOpenDrawer(task)}
                              />
                            </div>
                            <div></div>
                            <div>
                              <PrimaryButton
                                title="Delete"
                                color="danger"
                                variant="outlined"
                                onClick={() => handleDeleteClick(task._id)}
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
              <Modal
                title="View Task"
                centered
                open={openvisitdetails}
                onOk={() => setOpenVisitDetails(false)}
                onCancel={() => setOpenVisitDetails(false)}
                width={1000}
                maskStyle={{
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust overlay
                }}
                bodyStyle={{
                  padding: 24, // Adjust internal padding
                  backgroundColor: "#fff", // Ensure white background
                }}
              >
                <div>
                  <p
                    className="site-description-item-profile-p"
                    style={{
                      marginBottom: 24,
                    }}
                  >
                    User Profile
                  </p>
                  <p className="site-description-item-profile-p">Personal</p>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem title="Full Name" content="Lily" />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem
                        title="Account"
                        content="AntDesign@example.com"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem title="City" content="HangZhou" />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem title="Country" content="China🇨🇳" />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem
                        title="Birthday"
                        content="February 2,1900"
                      />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem title="Website" content="-" />
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <DescriptionItem
                        title="Message"
                        content="Make things as simple as possible but no simpler."
                      />
                    </Col>
                  </Row>
                  <Divider />
                  <p className="site-description-item-profile-p">Company</p>
                  <Row>
                    <Col span={12}>
                      <DescriptionItem title="Position" content="Programmer" />
                    </Col>
                    <Col span={12}>
                      <DescriptionItem
                        title="Responsibilities"
                        content="Coding"
                      />
                    </Col>
                  </Row>
                </div>
              </Modal>
              <EditTask
                open={isDrawerOpen}
                onClose={handleCloseDrawer}
                task={selectedTask}
              />
              <Modal
                title="Delete Task"
                visible={isDeleteModalOpen}
                onOk={handleConfirmDelete}
                onCancel={() => setIsDeleteModalOpen(false)}
                okText="Delete"
                okButtonProps={{ danger: true }}
              >
                {deleteloading && <CustomSpin />}
                {!deleteloading && (
                  <p>Are you sure you want to delete this task?</p>
                )}
              </Modal>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyTasks;
