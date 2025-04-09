// PharmacyDetailsModal.js
import React, { useState } from "react";
import {
  Modal,
  Tabs,
  Typography,
  Space,
  Card,
  Avatar,
  Row,
  Col,
  Tag,
  Button,
  Divider,
  Descriptions,
  Timeline,
  List,
} from "antd";
import {
  ShopOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  CalendarOutlined,
  ShareAltOutlined,
  PrinterOutlined,
  CheckCircleOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import MedicationTab from "../carer_template/medicatio_tab";

const { Title, Text, Paragraph } = Typography;

const PharmacyDetailsModal = ({
  openpharmacydetails,
  setOpenPharmacytDetails,
  pharmacy,
}) => {
  const [activeTab, setActiveTab] = useState("1");

  if (!pharmacy) {
    return null;
  }

  const is24Hours = pharmacy.is24Hours === "Yes" || pharmacy.is24Hours === true;

  // Generate initials for avatar
  const getInitials = (name) => {
    if (!name) return "P";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const getRandomColor = (seed) => {
    const colors = [
      "#1890ff",
      "#52c41a",
      "#722ed1",
      "#faad14",
      "#eb2f96",
      "#13c2c2",
    ];
    const hash = seed
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Parse services if it's a string
  const parseServices = (services) => {
    if (!services) return [];
    if (typeof services === "string") {
      // Try to parse as JSON first
      try {
        const parsed = JSON.parse(services);
        if (Array.isArray(parsed)) return parsed;
        return [services]; // If it's not an array, return as single item
      } catch (e) {
        // If not JSON, split by commas or return as is
        return services.includes(",")
          ? services.split(",").map((s) => s.trim())
          : [services];
      }
    }
    return Array.isArray(services) ? services : [services];
  };

  const servicesList = parseServices(pharmacy.services);
  const avatarColor = getRandomColor(pharmacy.name);

  return (
    <Modal
      open={openpharmacydetails}
      onCancel={() => setOpenPharmacytDetails(false)}
      width={1000}
      footer={null}
      centered
      bodyStyle={{ padding: 0 }}
      style={{
        borderRadius: "12px",
        overflow: "hidden",
      }}
      destroyOnClose
      className="pharmacy-details-modal"
    >
      {/* Header with background */}
      <div
        style={{
          background: `linear-gradient(135deg, ${avatarColor}80 0%, ${avatarColor}20 100%)`,
          padding: "40px 24px 20px",
          position: "relative",
        }}
      >
        <Button
          shape="circle"
          icon={<ShareAltOutlined />}
          style={{
            position: "absolute",
            right: "24px",
            top: "24px",
          }}
        />
        <Button
          shape="circle"
          icon={<PrinterOutlined />}
          style={{
            position: "absolute",
            right: "74px",
            top: "24px",
          }}
        />

        <Row gutter={24} align="middle">
          <Col>
            <Avatar
              size={64}
              style={{
                background: avatarColor,
                fontSize: "24px",
                fontWeight: "bold",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}
            >
              {getInitials(pharmacy.name)}
            </Avatar>
          </Col>
          <Col flex="auto">
            <Title level={3} style={{ margin: 0, color: "#202124" }}>
              {pharmacy.name}
            </Title>
            <Space size={4} style={{ marginTop: 4 }}>
              <Tag color={is24Hours ? "success" : "warning"}>
                {is24Hours ? "Open 24/7" : "Limited Hours"}
              </Tag>
              <Tag color="blue">Licensed Pharmacy</Tag>
              {servicesList.length > 0 && (
                <Tag color="cyan">{servicesList.length} Services</Tag>
              )}
            </Space>
          </Col>
        </Row>
      </div>

      {/* Tabs Navigation */}
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        type="card"
        centered
        size="large"
        tabBarStyle={{
          marginBottom: 0,
          borderBottom: "1px solid #f0f0f0",
          paddingLeft: 24,
          paddingRight: 24,
        }}
        items={[
          {
            key: "1",
            label: (
              <Space>
                <ShopOutlined />
                Overview
              </Space>
            ),
            children: (
              <div
                style={{ height: "60vh", overflow: "auto", padding: "24px" }}
              >
                <Row gutter={[24, 24]}>
                  {/* Left Column */}
                  <Col xs={24} md={16}>
                    <Card
                      title={
                        <Space>
                          <ShopOutlined />
                          <span>Pharmacy Details</span>
                        </Space>
                      }
                      bordered={false}
                      style={{
                        borderRadius: "12px",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                      }}
                    >
                      <Row gutter={[24, 16]}>
                        <Col xs={24} sm={12}>
                          <Space
                            direction="vertical"
                            size={2}
                            style={{ width: "100%" }}
                          >
                            <Text type="secondary">Address</Text>
                            <Space>
                              <EnvironmentOutlined
                                style={{ color: "#1890ff" }}
                              />
                              <Text strong>{pharmacy.address}</Text>
                            </Space>
                          </Space>
                        </Col>

                        <Col xs={24} sm={12}>
                          <Space
                            direction="vertical"
                            size={2}
                            style={{ width: "100%" }}
                          >
                            <Text type="secondary">Phone</Text>
                            <Space>
                              <PhoneOutlined style={{ color: "#1890ff" }} />
                              <Text strong copyable>
                                {pharmacy.contact.phone}
                              </Text>
                            </Space>
                          </Space>
                        </Col>

                        <Col xs={24} sm={12}>
                          <Space
                            direction="vertical"
                            size={2}
                            style={{ width: "100%" }}
                          >
                            <Text type="secondary">Email</Text>
                            <Space>
                              <MailOutlined style={{ color: "#1890ff" }} />
                              <Text strong copyable>
                                {pharmacy.contact.email}
                              </Text>
                            </Space>
                          </Space>
                        </Col>

                        <Col xs={24} sm={12}>
                          <Space
                            direction="vertical"
                            size={2}
                            style={{ width: "100%" }}
                          >
                            <Text type="secondary">License Number</Text>
                            <Space>
                              <SafetyCertificateOutlined
                                style={{ color: "#1890ff" }}
                              />
                              <Text strong copyable>
                                {pharmacy.licenseNumber}
                              </Text>
                            </Space>
                          </Space>
                        </Col>

                        <Col xs={24} sm={12}>
                          <Space
                            direction="vertical"
                            size={2}
                            style={{ width: "100%" }}
                          >
                            <Text type="secondary">Owner</Text>
                            <Space>
                              <UserOutlined style={{ color: "#1890ff" }} />
                              <Text strong>{pharmacy.owner}</Text>
                            </Space>
                          </Space>
                        </Col>

                        <Col xs={24} sm={12}>
                          <Space
                            direction="vertical"
                            size={2}
                            style={{ width: "100%" }}
                          >
                            <Text type="secondary">Working Hours</Text>
                            <Space>
                              <ClockCircleOutlined
                                style={{
                                  color: is24Hours ? "#52c41a" : "#faad14",
                                }}
                              />
                              <Text strong>
                                {is24Hours ? "Open 24 Hours" : "Limited Hours"}
                              </Text>
                            </Space>
                          </Space>
                        </Col>
                      </Row>
                    </Card>

                    {/* Services Card */}
                    {servicesList.length > 0 && (
                      <Card
                        title={
                          <Space>
                            <CustomerServiceOutlined />
                            <span>Services Offered</span>
                          </Space>
                        }
                        style={{
                          marginTop: 24,
                          borderRadius: "12px",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                        }}
                        bordered={false}
                      >
                        <Row gutter={[16, 16]}>
                          {servicesList.map((service, index) => (
                            <Col key={index} xs={24} sm={12} md={8}>
                              <Space align="start">
                                <CheckCircleOutlined
                                  style={{ color: "#52c41a" }}
                                />
                                <Text>{service}</Text>
                              </Space>
                            </Col>
                          ))}
                        </Row>
                      </Card>
                    )}

                    <Card
                      title={
                        <Space>
                          <MedicineBoxOutlined />
                          <span>Recent Activities</span>
                        </Space>
                      }
                      style={{
                        marginTop: 24,
                        borderRadius: "12px",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                      }}
                      bordered={false}
                    >
                      <Timeline
                        items={[
                          {
                            color: "green",
                            children: (
                              <>
                                <Text strong>Medication Inventory Updated</Text>
                                <div>
                                  <Text type="secondary">April 8, 2025</Text>
                                </div>
                              </>
                            ),
                          },
                          {
                            color: "blue",
                            children: (
                              <>
                                <Text strong>Prescription Filled</Text>
                                <div>
                                  <Text type="secondary">April 5, 2025</Text>
                                </div>
                              </>
                            ),
                          },
                          {
                            color: "blue",
                            children: (
                              <>
                                <Text strong>New Medicine Added</Text>
                                <div>
                                  <Text type="secondary">April 3, 2025</Text>
                                </div>
                              </>
                            ),
                          },
                        ]}
                      />
                    </Card>
                  </Col>

                  {/* Right Column */}
                  <Col xs={24} md={8}>
                    <Card
                      bordered={false}
                      style={{
                        borderRadius: "12px",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                      }}
                    >
                      <Space
                        direction="vertical"
                        size={16}
                        style={{ width: "100%" }}
                      >
                        <Space align="center">
                          <CalendarOutlined
                            style={{ fontSize: 16, color: "#1890ff" }}
                          />
                          <Title level={5} style={{ margin: 0 }}>
                            Quick Actions
                          </Title>
                        </Space>

                        <Button
                          type="primary"
                          block
                          onClick={() => setActiveTab("2")}
                        >
                          View Medication List
                        </Button>

                        <Button
                          block
                          icon={<PhoneOutlined />}
                          onClick={() => {
                            // This would typically trigger a contact action
                            // For now just log to console
                            console.log(
                              "Contact pharmacy:",
                              pharmacy.contact.phone
                            );
                          }}
                        >
                          Contact Pharmacy
                        </Button>

                        <Button
                          block
                          icon={<EnvironmentOutlined />}
                          onClick={() => {
                            // This would typically open maps with the address
                            // For now just log to console
                            console.log("Get directions to:", pharmacy.address);
                          }}
                        >
                          Get Directions
                        </Button>
                      </Space>
                    </Card>

                    <Card
                      title={
                        <Space>
                          <SafetyCertificateOutlined />
                          <span>Certifications</span>
                        </Space>
                      }
                      style={{
                        marginTop: 24,
                        borderRadius: "12px",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                      }}
                      bordered={false}
                    >
                      <Space direction="vertical" size={8}>
                        <Tag
                          color="cyan"
                          style={{ padding: "4px 8px", marginBottom: 8 }}
                        >
                          Licensed Pharmacy
                        </Tag>
                        <Tag
                          color="green"
                          style={{ padding: "4px 8px", marginBottom: 8 }}
                        >
                          Good Distribution Practice
                        </Tag>
                        <Tag color="purple" style={{ padding: "4px 8px" }}>
                          Health Safety Certified
                        </Tag>
                      </Space>
                    </Card>

                    {servicesList.length > 0 && (
                      <Card
                        title={
                          <Space>
                            <CustomerServiceOutlined />
                            <span>Top Services</span>
                          </Space>
                        }
                        style={{
                          marginTop: 24,
                          borderRadius: "12px",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                        }}
                        bordered={false}
                      >
                        <List
                          size="small"
                          dataSource={servicesList.slice(0, 3)}
                          renderItem={(item) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={
                                  <CheckCircleOutlined
                                    style={{ color: "#52c41a" }}
                                  />
                                }
                                title={item}
                              />
                            </List.Item>
                          )}
                          footer={
                            servicesList.length > 3 ? (
                              <div style={{ textAlign: "center" }}>
                                <Button
                                  type="link"
                                  onClick={() => {
                                    const servicesElement =
                                      document.getElementById(
                                        "services-section"
                                      );
                                    if (servicesElement) {
                                      servicesElement.scrollIntoView({
                                        behavior: "smooth",
                                      });
                                    }
                                  }}
                                >
                                  View all {servicesList.length} services
                                </Button>
                              </div>
                            ) : null
                          }
                        />
                      </Card>
                    )}
                  </Col>
                </Row>
              </div>
            ),
          },
          {
            key: "2",
            label: (
              <Space>
                <MedicineBoxOutlined />
                Medicines
              </Space>
            ),
            children: (
              <div
                style={{ height: "60vh", overflow: "auto", padding: "24px" }}
              >
                <MedicationTab visitId={pharmacy._id} />
              </div>
            ),
          },
          {
            key: "3",
            label: (
              <Space>
                <CustomerServiceOutlined />
                Services
              </Space>
            ),
            children: (
              <div
                id="services-section"
                style={{ height: "60vh", overflow: "auto", padding: "24px" }}
              >
                <Card
                  title={
                    <Title level={4}>Services Offered by {pharmacy.name}</Title>
                  }
                  bordered={false}
                  style={{
                    borderRadius: "12px",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                  }}
                >
                  {servicesList.length > 0 ? (
                    <Row gutter={[24, 24]}>
                      {servicesList.map((service, index) => (
                        <Col key={index} xs={24} sm={12} lg={8}>
                          <Card
                            bordered
                            style={{
                              height: "100%",
                              borderRadius: "8px",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                            }}
                          >
                            <Space align="start">
                              <Avatar
                                style={{
                                  backgroundColor: getRandomColor(service),
                                  marginRight: "12px",
                                }}
                                icon={<CheckCircleOutlined />}
                              />
                              <div>
                                <Text strong>{service}</Text>
                                <Paragraph
                                  type="secondary"
                                  style={{ marginTop: "4px", marginBottom: 0 }}
                                >
                                  Available at {pharmacy.name}
                                </Paragraph>
                              </div>
                            </Space>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <div style={{ textAlign: "center", padding: "40px 0" }}>
                      <Text type="secondary">
                        No services information available
                      </Text>
                    </div>
                  )}
                </Card>
              </div>
            ),
          },
        ]}
      />

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid #f0f0f0",
          padding: "16px 24px",
          textAlign: "right",
        }}
      >
        <Space>
          <Button onClick={() => setOpenPharmacytDetails(false)}>Close</Button>
          {activeTab === "1" && servicesList.length > 0 && (
            <Button onClick={() => setActiveTab("3")}>View All Services</Button>
          )}
          {activeTab === "1" && (
            <Button type="primary" onClick={() => setActiveTab("2")}>
              View Medicines
            </Button>
          )}
        </Space>
      </div>
    </Modal>
  );
};

export default PharmacyDetailsModal;
