import CustomNoData from "components/nodata/no_data";
import CustomSkeleton from "components/skeletons/custom_skeleton";
import React, { useEffect, useState } from "react";
import { Row, Button } from "antd";
import VitalService from "services/vital_service/vital_service";

const VitalsTab = ({ visitId }) => {
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVitals = async () => {
      if (!visitId) return;

      setLoading(true);
      setError("");

      try {
        const response = await VitalService.getVitalByVisit(visitId);
        setVitals(response.data || []);
      } catch (err) {
        setError(err.message || "Error fetching vitals");
      } finally {
        setLoading(false);
      }
    };

    fetchVitals();
  }, [visitId]);

  return (
    <div>
      {loading ? (
        <CustomSkeleton height="200px" width="100%" />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : vitals.length > 0 ? (
        <div sm="6">
          {vitals.map((vital) => (
            <div
              key={vital.id}
              className="pl-3 pr-3 mx-2 bg-white rounded-lg shadow border border-gray-200 p-4 mb-5 max-w-sm hover:shadow-lg hover:scale-105 transition-transform duration-200"
            >
              <h4 className="mb-2 text-gray-700">
                Temperature: {vital.Temperature}
              </h4>
              <h4 className="mb-2 text-gray-700">
                Blood Pressure Systolic: {vital.bloodPressure.systolic}
              </h4>

              <h4 className="mb-2 text-gray-700">
                Blood Pressure Diastolic: {vital.bloodPressure.diastolic}
              </h4>

              <h4 className="mb-2 text-gray-700">
                Heart Rate: {vital.heartRate}
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

export default VitalsTab;
