import CustomNoData from 'components/nodata/no_data';
import CustomSkeleton from 'components/skeletons/custom_skeleton';
import React, { useEffect, useState } from 'react';
import ObservationsService from 'services/observations_services/observations_services';
import {
  Row,
  Button,
 
} from "antd";

const ObservationsTab = ({ visitId }) => {
  const [observations, setObservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchObservations = async () => {
      if (!visitId) return; 

      setLoading(true);
      setError("");

      try {
        const response = await ObservationsService.getObservationsByVisit(visitId);
        setObservations(response.data || []);
      } catch (err) {
        setError(err.message || "Error fetching observations");
      } finally {
        setLoading(false);
      }
    };

    fetchObservations();
  }, [visitId]);

  return (
    <div>
      {loading ? (
                             <CustomSkeleton height="200px" width="100%" />

      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : observations.length > 0 ? (
        <div sm="6">
        {observations.map((observation) => (
          <div
            key={observation.id}
            className="pl-3 pr-3 mx-2 bg-white rounded-lg shadow border border-gray-200 p-4 mb-5 max-w-sm hover:shadow-lg hover:scale-105 transition-transform duration-200"
          >
           
            <h4 className="mb-2 text-gray-700">
              Description: {observation.description}
            </h4>
            <h4 className="mb-2 text-gray-700">
                Status: {observation.date}
                </h4>

            <Row >
              <div className="col">
               
              </div>
              <div className="col text-right">
                <Button
                  color="primary"
                  href="#pablo"
                  size="sm"
                >
                  View More
                </Button>
               
              </div>
            </Row>
          </div>
        ))}
      </div>
      ) : (
        <div className='mb-4'>
                    <CustomNoData width="70px" height="70px" />


        </div>


      )}
    </div>
  );
};

export default ObservationsTab;
