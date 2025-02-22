import React, { useEffect } from "react";
import {
  Drawer,
  Button,
  Space,
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  message,
} from "antd";
import moment from "moment";
import VisitsService from "services/visits_service/visits_service";
import { showMessage } from "helper/feedback_message_helper";
import { useState } from "react";
import CustomSpin from "components/customised_spins/customised_sprin";
import CarerService from "services/carer_services/carer_service";
import ClientService from "services/client_services/client_services";
import TaskService from "services/task_service/task_service";

const { Option } = Select;

const EditTask = ({ open, onClose, task }) => {
  const [form] = Form.useForm();
  const [addloading, setAddLoading] = useState(false);
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [clients, setClients] = useState([]);
  const [visitloading, setVisitLoading] = useState(true);
  const [errorVisit, setErrorVisit] = useState(null);

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        name: task.name,
        status: task.status,
        description: task.description,
      });
    }
  }, [task, form]);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await VisitsService.getAllVisits();
        setVisits(response.data || []);
      } catch (err) {
        setError(err.message || "Error fetching visits");
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        // Prepare data for the API
        const updatedData = {
          ...values,

          status: values.status,
          name: values.name,
          description: values.description,
        };

        try {
          setAddLoading(true);
          const response = await TaskService.updateTaskById(
            task._id,
            updatedData
          );
          showMessage("success", "update task successfully!");

          onClose();
        } catch (error) {
          showMessage("Something went wrong!");
        } finally {
          setAddLoading(false);
        }
      })
      .catch((info) => {
        console.error("Validation failed:", info);
      });
  };

  return (
    <Drawer
      title="Edit Task"
      width={720}
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="primary" color="success">
            Update
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
                    message: "Please enter  name",
                  },
                ]}
              >
                <Input placeholder="Please enter name" />
              </Form.Item>
            </Col>
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
                  <Option value="Scheduled">Pending</Option>
                  <Option value="Completed">Completed</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="visit"
                label="Visit"
                rules={[
                  {
                    required: true,
                    message: "Please select visit",
                  },
                ]}
              >
                <Select placeholder="Please select visit">
                  {visitloading ? (
                    <Option value="loading" disabled>
                      Loading...
                    </Option>
                  ) : errorVisit ? (
                    <Option value="error" disabled>
                      Error fetching carers
                    </Option>
                  ) : visits.length > 0 ? (
                    visits.map((visit) => (
                      <Option key={visit._id} value={visit.location.address}>
                        {visit.location.address}
                      </Option>
                    ))
                  ) : (
                    <Option value="no-visit" disabled>
                      No visit available
                    </Option>
                  )}
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
  );
};

export default EditTask;
