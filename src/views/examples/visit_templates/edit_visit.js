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

const { Option } = Select;


const EditVisit = ({ open, onClose, visit }) => {
  const [form] = Form.useForm();
  const [addloading, setAddLoading] = useState(false);
  const [carers, setCarers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [clients, setClients] = useState([]);
  const [clientloading, setClientLoading] = useState(true);
  const [errorClient, setErrorClient] = useState(null);


  useEffect(() => {
    if (visit) {
      form.setFieldsValue({
        title: visit.title,
        status: visit.status,
        WorkingTime: visit.WorkingTime
          ? [moment(visit.WorkingTime[0]), moment(visit.WorkingTime[1])]
          : null,
        address: visit.location?.address || "",
      });
    }
  }, [visit, form]);

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

  useEffect(() => {
    const fetchClients = async () => {
        console.log('services client calling');
        
      try {
        const response = await ClientService.getAllClient();
        setClients(response.data || []);
      } catch (err) {
        setErrorClient(err.message || "Error fetching clients");
      } finally {
        setClientLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        // Prepare data for the API
        const updatedData = {
          ...values,
          location: {
            ...visit.location,
            address: values.address,
          },
          startTime: values.WorkingTime
            ? values.WorkingTime[0].toISOString()
            : null,
          endTime: values.WorkingTime
            ? values.WorkingTime[1].toISOString()
            : null,
          status: values.status,
        };

        try {
          setAddLoading(true);
          const response = await VisitsService.updateVisitById(
            visit._id,
            updatedData
          );
          showMessage("success", "update visit successfully!");

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
      title="Edit Visit"
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
                name="client"
                label="Client"
                rules={[
                  {
                    required: true,
                    message: "Please select client",
                  },
                ]}
              >
                <Select placeholder="Please select client">
                  {clientloading ? (
                    <Option value="loading" disabled>
                      Loading...
                    </Option>
                  ) : errorClient ? (
                    <Option value="error" disabled>
                      Error fetching carers
                    </Option>
                  ) : clients.length > 0 ? (
                    clients.map((client) => (
                      <Option key={client._id} value={client.firstName}>
                        {client.firstName}
                      </Option>
                    ))
                  ) : (
                    <Option value="no-carers" disabled>
                      No clients available
                    </Option>
                  )}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="employee"
                label="Employee"
                rules={[
                  {
                    required: true,
                    message: "Please select employee",
                  },
                ]}
              >
                <Select placeholder="Please select employee">
                  {loading ? (
                    <Option value="loading" disabled>
                      Loading...
                    </Option>
                  ) : error ? (
                    <Option value="error" disabled>
                      Error fetching carers
                    </Option>
                  ) : carers.length > 0 ? (
                    carers.map((carer) => (
                      <Option key={carer._id} value={carer.firstName}>
                        {carer.firstName}
                      </Option>
                    ))
                  ) : (
                    <Option value="no-carers" disabled>
                      No carers available
                    </Option>
                  )}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="WorkingTime"
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
  );
};

export default EditVisit;
