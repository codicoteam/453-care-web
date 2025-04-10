// VisitDetailsModal.js
import React from "react";
import {
  Modal,
  Badge,
  Row,
  Col,
  Divider,
  Avatar,
  Card,
  Typography,
} from "antd";
import { Tabs } from "antd";
import TasksTab from "../carer_template/task_tab";
import ObservationsTab from "../carer_template/observation_tab";
import MedicationTab from "../carer_template/medicatio_tab";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  DollarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const VisitDetailsModal = ({
  openvisitdetails,
  setOpenVisitDetails,
  visit,
}) => {
  // Map status to color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "success";
      case "scheduled":
        return "processing";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  // Format time for display
  const formatTime = (time) => {
    return time || "Not specified";
  };

  const InfoItem = ({ icon, label, value }) => (
    <div
      className="info-item"
      style={{
        marginBottom: "12px",
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      {icon && (
        <div style={{ marginRight: "8px", color: "#1890ff" }}>{icon}</div>
      )}
      <div>
        <Text
          type="secondary"
          style={{ fontSize: "14px", display: "block", marginBottom: "4px" }}
        >
          {label}
        </Text>
        <Text strong style={{ fontSize: "15px" }}>
          {value || "Not specified"}
        </Text>
      </div>
    </div>
  );

  const PersonCard = ({ title, person, personType }) => (
    <Card
      className="person-card"
      bordered={false}
      style={{
        borderRadius: "8px",
        background: personType === "client" ? "#f0f7ff" : "#f6f0ff",
        marginBottom: "20px",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
      >
        <Avatar
          size={48}
          icon={<UserOutlined />}
          style={{
            backgroundColor: personType === "client" ? "#1890ff" : "#722ed1",
            marginRight: "12px",
          }}
        />
        <div>
          <Title level={4} style={{ margin: 0 }}>
            {title}
          </Title>
          <Text>
            {person?.firstName} {person?.lastName}
          </Text>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <InfoItem
            icon={<PhoneOutlined />}
            label="Contact Number"
            value={person?.contactNumber}
          />
        </Col>
        <Col span={12}>
          <InfoItem
            icon={<HomeOutlined />}
            label="Address"
            value={person?.address}
          />
        </Col>
        <Col span={12}>
          {personType === "client" ? (
            <InfoItem label="Gender" value={person?.gender} />
          ) : (
            <InfoItem label="Specialization" value={person?.specialization} />
          )}
        </Col>
      </Row>
    </Card>
  );

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Modal
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "18px", fontWeight: "500" }}>
            Visit Details
          </span>
          {visit?.status && (
            <Badge
              status={getStatusColor(visit.status)}
              text={<Text strong>{visit.status}</Text>}
            />
          )}
        </div>
      }
      centered
      open={openvisitdetails}
      onOk={() => setOpenVisitDetails(false)}
      onCancel={() => setOpenVisitDetails(false)}
      width={900}
      footer={null}
      bodyStyle={{
        padding: "24px",
        maxHeight: "80vh",
        overflow: "auto",
      }}
      style={{
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      {visit ? (
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="large"
          onChange={onChange}
          items={[
            {
              key: "1",
              label: "Details",
              children: (
                <div style={{ padding: "16px 0" }}>
                  <Card
                    bordered={false}
                    style={{
                      borderRadius: "8px",
                      background:
                        "linear-gradient(145deg, #f0f5ff 0%, #e6f7ff 100%)",
                      marginBottom: "24px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <Row gutter={[24, 16]}>
                      <Col xs={24} sm={12}>
                        <InfoItem
                          icon={<EnvironmentOutlined />}
                          label="Location"
                          value={visit.location?.address}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <InfoItem
                          icon={<CalendarOutlined />}
                          label="Date of Visit"
                          value={visit.DateOfVisit}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <InfoItem
                          icon={<ClockCircleOutlined />}
                          label="Start Time"
                          value={formatTime(visit.startTime)}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <InfoItem
                          icon={<ClockCircleOutlined />}
                          label="End Time"
                          value={formatTime(visit.endTime)}
                        />
                      </Col>
                      <Col xs={24} sm={12}>
                        <InfoItem
                          icon={<DollarOutlined />}
                          label="Amount Paid Per Hour"
                          value={visit.amount_paid_per_hou}
                        />
                      </Col>
                      <Col span={24}>
                        <InfoItem
                          icon={<FileTextOutlined />}
                          label="Description"
                          value={visit.description}
                        />
                      </Col>
                    </Row>
                  </Card>

                  <Divider orientation="left">
                    <span style={{ fontSize: "16px", fontWeight: 500 }}>
                      People Involved
                    </span>
                  </Divider>

                  <PersonCard
                    title="Client"
                    person={visit.clientId}
                    personType="client"
                  />

                  <PersonCard
                    title="Carer Professional"
                    person={visit.careProfessionalId}
                    personType="carer"
                  />
                </div>
              ),
            },
            {
              key: "2",
              label: "Tasks",
              children: <TasksTab visitId={visit._id} />,
            },
            {
              key: "3",
              label: "Care Teams",
              children: (
                <div
                  className="care-teams-container"
                  style={{ padding: "24px 0", textAlign: "center" }}
                >
                  <Card
                    bordered={false}
                    style={{
                      borderRadius: "8px",
                      background: "#f9f9f9",
                      marginBottom: "16px",
                    }}
                  >
                    <Text type="secondary">
                      Care Teams information will be displayed here
                    </Text>
                  </Card>
                </div>
              ),
            },
            {
              key: "4",
              label: "Observations",
              children: <ObservationsTab visitId={visit._id} />,
            },
            {
              key: "5",
              label: "Medications",
              children: <MedicationTab visitId={visit._id} />,
            },
          ]}
        />
      ) : (
        <div style={{ textAlign: "center", padding: "32px" }}>
          <div style={{ fontSize: "24px", marginBottom: "16px" }}>
            <div className="loading-spinner" style={{ margin: "0 auto" }}></div>
          </div>
          <Text type="secondary">Loading visit details...</Text>
        </div>
      )}
    </Modal>
  );
};

export default VisitDetailsModal;
