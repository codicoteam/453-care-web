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


const MakeVisitFromAppointment = ({ open, onClose, appointment }) => {
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
          const response = await VisitsService.updateVisitById(
            appointment._id,
            updatedData
          );
          showMessage("success", "make visit successfully!");

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
      title="Make Visit"
      width={720}
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="primary" color="success">
            Make Visit
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
                    message: "Please enter payment status",
                  },
                ]}
              >
                <Input placeholder="Please enter payment status" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="street"
                label="Street"
                rules={[
                  {
                    required: true,
                    message: "Please enter  street",
                  },
                ]}
              >
                <Input placeholder="Please enter street" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="state"
                label="State"
                rules={[
                  {
                    required: true,
                    message: "Please enter  state",
                  },
                ]}
              >
                <Input placeholder="Please enter state" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="city"
                label="City"
                rules={[
                  {
                    required: true,
                    message: "Please enter  city",
                  },
                ]}
              >
                <Input placeholder="Please enter city" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="more_info"
                label="More information"
                rules={[
                  {
                    required: true,
                    message: "Please enter  more_info",
                  },
                ]}
              >
                <Input placeholder="Please enter more_info" />
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
         
          </Row>

         
        </Form>
      )}
    </Drawer>
  );
};

export default MakeVisitFromAppointment;
