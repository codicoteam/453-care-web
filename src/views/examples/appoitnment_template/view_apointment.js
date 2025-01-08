// AppoitmentDetailsModal.js
import React, { useEffect } from "react";
import { Modal, Form, Row, Col, Divider } from "antd";
import { Tabs } from "antd";
import TasksTab from "../carer_template/task_tab";
import moment from "moment";
import ObservationsTab from "../carer_template/observation_tab";
import MedicationTab from "../carer_template/medicatio_tab";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);
const onChange = (key) => {
  console.log(key);
};
const AppoitmentDetailsModal = ({
  openappointmentdetails,
  setOpenAppoitmentDetails,
  appointment,
}) => {
  const [form] = Form.useForm();

  console.log("my selected appointment", appointment._id);

  return (
    <Modal
      title="View Appointment"
      centered
      open={openappointmentdetails}
      onOk={() => setOpenAppoitmentDetails(false)}
      onCancel={() => setOpenAppoitmentDetails(false)}
      width={1100}
      height={800}

      maskStyle={{
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust overlay
      }}
      bodyStyle={{
        padding: 24, // Adjust internal padding
        backgroundColor: "#fff", // Ensure white background
      }}
    >
      {visit ? (
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: "Details",
              children: (
                <div>
                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                      Street:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {appointment.clientAddress.street}
                      </h3>
                    </div>
                  </Row>
                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                      City:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {appointment.clientAddress.city}
                      </h3>
                    </div>
                  </Row>

                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                      State:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {appointment.clientAddress.state}
                      </h3>
                    </div>
                  </Row>

                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                      Service Type:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {appointment.serviceType}
                      </h3>
                    </div>
                  </Row>
                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                      Visit Date:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {appointment.visitDate}
                      </h3>
                    </div>
                  </Row>

                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                      Status:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {appointment.status}
                      </h3>
                    </div>
                  </Row>

                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                      Payment Status:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {appointment.paymentStatus}
                      </h3>
                    </div>
                  </Row>
                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                      More_info :
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {appointment.more_info}
                      </h3>
                    </div>
                  </Row>




                  <Divider />

                  <div>
                    <h3 className="mb-0">Client</h3>
                  </div>

                  <div className="row ml-1">
                    <Row className="mr-8">
                      <div>
                        <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                          Full Name:
                        </h3>
                      </div>
                      <div>
                        <h3 className="mb-0" style={{ color: "grey" }}>
                          {visit.clientId.firstName}
                        </h3>
                      </div>
                    </Row>
                    <Row>
                      <div>
                        <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                          Contact Number:
                        </h3>
                      </div>
                      <div>
                        <h3 className="mb-0" style={{ color: "grey" }}>
                          {visit.clientId.contactNumber}
                        </h3>
                      </div>
                    </Row>
                  </div>

                  <div className="row ml-1">
                    <Row className="mr-8">
                      <div>
                        <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                          Address:
                        </h3>
                      </div>
                      <div>
                        <h3 className="mb-0" style={{ color: "grey" }}>
                          {visit.clientId.address}
                        </h3>
                      </div>
                    </Row>
                    <Row>
                      <div>
                        <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                          Gender:
                        </h3>
                      </div>
                      <div>
                        <h3 className="mb-0" style={{ color: "grey" }}>
                          {visit.clientId.gender}
                        </h3>
                      </div>
                    </Row>
                  </div>

                 
               
                 
                </div>
              ),
            },
          
            {
              key: "3",
              label: "Care Teams",
              children: (
                <div>
                  <p>This is the first text in Tab 3.</p>
                  <p>This is the second text in Tab 3.</p>
                </div>
              ),
            },
            
           
          ]}
          onChange={onChange}
        />
      ) : (
        <p>Loading visit details...</p>
      )}
    </Modal>
  );
};

export default AppoitmentDetailsModal;
