// VisitDetailsModal.js
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
const VisitDetailsModal = ({
  openvisitdetails,
  setOpenVisitDetails,
  visit,
}) => {
  const [form] = Form.useForm();

  console.log("my selected visit", visit._id);

  return (
    <Modal
      title="View Visit"
      centered
      open={openvisitdetails}
      onOk={() => setOpenVisitDetails(false)}
      onCancel={() => setOpenVisitDetails(false)}
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
                        Location:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {visit.location.address}
                      </h3>
                    </div>
                  </Row>
                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                        Date of visit:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {visit.DateOfVisit}
                      </h3>
                    </div>
                  </Row>

                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                        Start Time:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {visit.startTime}
                      </h3>
                    </div>
                  </Row>

                  <Row className="mr-8">
                    <div>
                      <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                        End Time:
                      </h3>
                    </div>
                    <div>
                      <h3 className="mb-0" style={{ color: "grey" }}>
                        {visit.endTime}
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
                        {visit.status}
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

                  <Divider />
                  <div>
                    <h3 className="mb-0">Carer</h3>
                  </div>
                  <div className="row ml-1">
                    <Row className="mr-8">
                      <div>
                        <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                          First Name:
                        </h3>
                      </div>
                      <div>
                        <h3 className="mb-0" style={{ color: "grey" }}>
                          {visit.careProfessionalId.firstName}
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
                          {visit.careProfessionalId.contactNumber}
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
                          {visit.careProfessionalId.address}
                        </h3>
                      </div>
                    </Row>
                    <Row>
                      <div>
                        <h3 className="mb-0 mr-5" style={{ color: "grey" }}>
                          Specialization:
                        </h3>
                      </div>
                      <div>
                        <h3 className="mb-0" style={{ color: "grey" }}>
                          {visit.careProfessionalId.specialization}
                        </h3>
                      </div>
                    </Row>
                  </div>
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
                <div>
                  <p>This is the first text in Tab 3.</p>
                  <p>This is the second text in Tab 3.</p>
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
          onChange={onChange}
        />
      ) : (
        <p>Loading visit details...</p>
      )}
    </Modal>
  );
};

export default VisitDetailsModal;
