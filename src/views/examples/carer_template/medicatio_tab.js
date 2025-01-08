import CustomNoData from "components/nodata/no_data";
import CustomSkeleton from "components/skeletons/custom_skeleton";
import React, { useEffect, useState } from "react";
import MedicationService from "services/medication_services/medication_services";
import ObservationsService from "services/observations_services/observations_services";
import { IoIosAdd } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Row, Button } from "antd";

const MedicationTab = ({ visitId }) => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [frequency, setFrequency] = useState("daily");
  const [selectedDays, setSelectedDays] = useState([]);

  const typeOfMedication = [
    "Scheduled",
    "PRN",
    "Blister pack"

  ];


  const medicationSupport = [
    "Adminster",
    "Assist",
    "Prompt"

  ];

  const dose = [
    "quantity",
    "Range",
    "Other"

  ];

  const frequencyuse = [
    "Daily",
    "Custom",

  ];

  const routee = [
    "Oral",
    "Other",

  ];




  const timeSlots = ["Morning", "Afternoon", "Evening", "Night"];

  const formContainerStyle = {
    padding: "1.5rem",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
  };

  const headingStyle = {
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: "1rem",
  };

  const formGroupStyle = {
    marginBottom: "1rem",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: 500,
    marginBottom: "0.25rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem",
    border: "1px solid #e5e7eb",
    borderRadius: "0.375rem",
  };

  const checkboxContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
  };

  const getFrequencyButtonStyle = (option) => ({
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    transition: "all 0.2s",
    border: "2px solid transparent",
    backgroundColor: frequency === option ? "#dcfce7" : "#f9fafb",
    color: frequency === option ? "#166534" : "#374151",
    textTransform: "capitalize",
    cursor: "pointer",
    ":hover": {
      borderColor: "#22c55e",
    },
  });

  const getDayButtonStyle = (day) => ({
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    transition: "all 0.2s",
    border: "2px solid transparent",
    backgroundColor: selectedDays.includes(day) ? "#dcfce7" : "#f9fafb",
    color: selectedDays.includes(day) ? "#166534" : "#374151",
    cursor: "pointer",
    ":hover": {
      borderColor: "#22c55e",
    },
  });

  const timeSlotButtonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    backgroundColor: "#f9fafb",
    border: "2px solid transparent",
    cursor: "pointer",
    ":hover": {
      borderColor: "#22c55e",
    },
  };

  const submitButtonStyle = {
    backgroundColor: "#16a34a",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#15803d",
    },
  };

  const handleDaySelect = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  useEffect(() => {
    const fetchMedication = async () => {
      if (!visitId) return;

      setLoading(true);
      setError("");

      try {
        const response = await MedicationService.getMedicationByVisit(visitId);
        setMedications(response.data || []);
      } catch (err) {
        setError(err.message || "Error fetching medications");
      } finally {
        setLoading(false);
      }
    };

    fetchMedication();
  }, [visitId]);

  return (
    <div>
      <Row>
        <div className="col my-4"></div>
        <div className="col text-right">
          <Button
            href="#pablo"
            size="sm"
            style={{
              backgroundColor: showForm ? "grey" : "green",
              color: "white",
              borderColor: "green",
            }}
            onClick={() => setShowForm(!showForm)} // Toggle the state
          >
            {showForm ? <IoMdArrowRoundBack /> : <IoIosAdd size={25} />}{" "}
            {/* Toggle button text */}
            {showForm ? "Back to Medictions" : "Add Mediction"}{" "}
            {/* Toggle button text */}
          </Button>
        </div>
      </Row>

      {showForm ? (
        // Show the form if `showForm` is true
        <div style={formContainerStyle}>
          <h4 style={headingStyle}>Add New Medication</h4>
          <form>
            <div style={formGroupStyle}>
              <label htmlFor="Medication Name" style={labelStyle}>
              Medication Name
              </label>
              <input
                type="text"
                style={inputStyle}
                id="medicationName"
                placeholder="Enter medication name"
              />
            </div>

            

           

            <div style={formGroupStyle}>
                <label style={labelStyle}>What support is requred for this medication?</label>
                <div style={buttonContainerStyle}>
                  {medicationSupport.map((medsuport) => (
                    <button
                      key={medsuport}
                      type="button"
                      onClick={() => handleDaySelect(medsuport)}
                      style={getDayButtonStyle(medsuport)}
                    >
                      {medsuport}
                    </button>
                  ))}
                </div>
              </div>
              <br></br>

           

              <div style={formGroupStyle}>
                <label style={labelStyle}>What type of medication is this?</label>
                <div style={buttonContainerStyle}>
                  {typeOfMedication.map((typemedication) => (
                    <button
                      key={typemedication}
                      type="button"
                      onClick={() => handleDaySelect(typemedication)}
                      style={getDayButtonStyle(typemedication)}
                    >
                      {typemedication}
                    </button>
                  ))}
                </div>
              </div>
              <br></br>


              <div style={formGroupStyle}>
                <label style={labelStyle}>What is the dose for this medication?</label>
                <div style={buttonContainerStyle}>
                  {dose.map((dos) => (
                    <button
                      key={dos}
                      type="button"
                      onClick={() => handleDaySelect(dos)}
                      style={getDayButtonStyle(dos)}
                    >
                      {dos}
                    </button>
                  ))}
                </div>
              </div>

              <br></br>

              <div style={formGroupStyle}>
                <label style={labelStyle}>What is the dose for this medication?</label>
                <div style={buttonContainerStyle}>
                  {routee.map((rout) => (
                    <button
                      key={rout}
                      type="button"
                      onClick={() => handleDaySelect(rout)}
                      style={getDayButtonStyle(rout)}
                    >
                      {rout}
                    </button>
                  ))}
                </div>
              </div>

              <br></br>



              <div style={formGroupStyle}>
                <label style={labelStyle}>How often is this medication taken ?</label>
                <div style={buttonContainerStyle}>
                  {frequencyuse.map((freuse) => (
                    <button
                      key={freuse}
                      type="button"
                      onClick={() => handleDaySelect(freuse)}
                      style={getDayButtonStyle(freuse)}
                    >
                      {freuse}
                    </button>
                  ))}
                </div>
              </div>

              <br></br>

         

            <div style={formGroupStyle}>
              <label htmlFor="taskStatus" style={labelStyle}>
                Status
              </label>
              <select style={inputStyle} id="taskStatus">
                <option value="Pending">Pending</option>
                <option value="Taken">Taken</option>
              </select>
            </div>

            <Button type="submit" style={submitButtonStyle}>
              Save Task
            </Button>
          </form>
        </div>
      ) : loading ? (
        <CustomSkeleton height="200px" width="100%" />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : medications.length > 0 ? (
        <div sm="6">
          {medications.map((medication) => (
            <div
              key={medication.id}
              className="pl-3 pr-3 mx-2 bg-white rounded-lg shadow border border-gray-200 p-4 mb-5 max-w-sm hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              <h4 className="mb-2 text-gray-700">Name: {medication.name}</h4>

              <h4 className="mb-2 text-gray-700">
                Description: {medication.description}
              </h4>
              <h4 className="mb-2 text-gray-700">
                Status: {medication.status}
              </h4>

              <h4 className="mb-2 text-gray-700">
                Dosage: {medication.dosage}
              </h4>
              <h4 className="mb-2 text-gray-700">
                Frequency: {medication.frequency}
              </h4>

              <Row>
                <div className="col"></div>
                <div className="col text-right">
                  <Button color="primary" href="#pablo" size="sm">
                    View More
                  </Button>
                </div>
              </Row>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-4">
          <CustomNoData width="70px" height="70px" />
        </div>
      )}
    </div>
  );
};

export default MedicationTab;
