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
import AppointmentService from "services/appointments_service/appointments_service";

const { Option } = Select;


const EditAppointment = ({ open, onClose, appointment }) => {
  const [form] = Form.useForm();
  const [addloading, setAddLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [clients, setClients] = useState([]);
  const [clientloading, setClientLoading] = useState(true);
  const [errorClient, setErrorClient] = useState(null);


  useEffect(() => {
    if (appointment) {
      form.setFieldsValue({
        paymentStatus: appointment.paymentStatus,
        status: appointment.status,
        more_info: appointment.more_info,
        street: appointment.clientAddress?.street || "",
        state: appointment.clientAddress?.state || "",
        city: appointment.clientAddress?.city || "",
      });
    }
  }, [appointment, form]);



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
         
          status: values.status,
          paymentStatus: values.paymentStatus,
          more_info: values.more_info,
          street: values.clientAddress?.street,
          state: values.clientAddress?.state ,
          city: values.clientAddress?.city ,
        };

        try {
          setAddLoading(true);
          const response = await AppointmentService.updateAppointmentsById(
            appointment._id,
            updatedData
          );
          showMessage("success", "update appointment successfully!");

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
      title="Edit Appointment"
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
                name="paymentStatus"
                label="Payment Status"
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

export default EditAppointment;
