// VitalDetailsModal.js
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
const VitalDetailsModal = ({
  openvitaldetails,
  setOpenVitalDetails,
  vital,
}) => {
  const [form] = Form.useForm();

  console.log("my selected vital", vital._id);

  return (
    <Modal
      title="View Vital"
      centered
      open={openvitaldetails}
      onOk={() => setOpenVitalDetails(false)}
      onCancel={() => setOpenVitalDetails(false)}
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
      {vital ? (
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
                      Temperature:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {vital.temperature}
                      </h3>
                    </div>
                  </Row>
                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                      Heart Rate:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {vital.heartRate}
                      </h3>
                    </div>
                  </Row>

                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                      RespiratoryRate:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {vital.respiratoryRate}
                      </h3>
                    </div>
                  </Row>

                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                      Oxygen Saturation:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {vital.oxygenSaturation}
                      </h3>
                    </div>
                  </Row>
                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                      Notes:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {vital.notes}
                      </h3>
                    </div>
                  </Row>

                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                      Blood Pressure systolic:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {vital.bloodPressure.systolic}
                      </h3>
                    </div>
                  </Row>

                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                      Blood Pressure diastolic:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {vital.bloodPressure.diastolic}
                      </h3>
                    </div>
                  </Row>

                  
                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                      Recorded At :
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {vital.recordedAt}
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
                          {vital.clientId.firstName}
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
                          {vital.clientId.contactNumber}
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
                          {vital.clientId.address}
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
                          {vital.clientId.gender}
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
        <p>Loading vitals details...</p>
      )}
    </Modal>
  );
};

export default VitalDetailsModal;
