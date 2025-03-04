/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import HomeTable from "components/tables/home_table";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Badge,
} from "reactstrap";
import {
  AudioOutlined,
  UserOutlined,
  DollarOutlined,
  CarOutlined,
  TeamOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Input, Space, Pie, Bar } from "antd";
import PrimaryButton from "components/buttons/primary_button";
import Chart from "chart.js"; // ✅ Import Chart.js v2 correctly
import { Pie as PieChart, Bar as BarChart, Doughnut } from "react-chartjs-2";
import CarerService from "services/carer_services/carer_service";
import VisitsService from "services/visits_service/visits_service.js";
import ClientService from "services/client_services/client_services";
import { useEffect, useState } from "react";
import { PieChartRounded } from "@mui/icons-material";

// Adjust path if needed,

const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);

// Sample data - replace with actual backend fetched data

// const clientsData = {
//   labels: ["Regular Care", "Intensive Care", "Occasional Care", "New Clients"],
//   datasets: [
//     {
//       data: [45, 23, 18, 7],
//       backgroundColor: ["#007bff", "#dc3545", "#6c757d", "#28a745"],
//       borderColor: ["#fff", "#fff", "#fff", "#fff"],
//       borderWidth: 2,
//     },
//   ],
// };

const financeData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [12500, 13200, 14800, 13900, 15600, 17200],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    },
    {
      label: "Expenses",
      data: [10200, 11000, 10800, 11200, 12100, 13000],
      backgroundColor: "rgba(255, 99, 132, 0.6)",
    },
  ],
};

const runnersData = [
  { name: "John Smith", activeJobs: 3, completedToday: 8, rating: 4.8 },
  { name: "Mary Johnson", activeJobs: 2, completedToday: 6, rating: 4.9 },
  { name: "Dave Wilson", activeJobs: 4, completedToday: 5, rating: 4.7 },
  { name: "Sarah Brown", activeJobs: 1, completedToday: 9, rating: 5.0 },
];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

const MyDashboard = () => {
  const [error, setError] = useState(null);
  const [visits, setVisits] = useState([]);
  const [visitloading, setVisitLoading] = useState(true);

  // Initializing visitsData, we will update it after fetching the data
  const [visitsData, setVisitsData] = useState({
    labels: ["Scheduled", "Ongoing", "Completed", "Confirmed"],
    datasets: [
      {
        data: [0, 0, 0, 0], // Initializing counts with 0
        backgroundColor: ["#ffc107", "#17a2b8", "#28a745", "#007bff"],
        borderColor: ["#fff", "#fff", "#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  });

  // Fetch visits and update chart data
  useEffect(() => {
    const fetchVisits = async () => {
      console.log("Fetching visits");

      try {
        const response = await VisitsService.getAllVisits();
        console.log(response.data);

        setVisits(response.data || []);
        updateVisitsData(response.data || []);
      } catch (err) {
        setError(err.message || "Error fetching visits");
      } finally {
        setVisitLoading(false);
      }
    };

    // Filter the visits by their status and update the chart data
    const updateVisitsData = (visitsArray) => {
      const statusCounts = {
        Scheduled: 0,
        Ongoing: 0,
        Completed: 0,
        Confirmed: 0,
      };

      // Count visits based on their status
      visitsArray.forEach((visit) => {
        if (statusCounts[visit.status] !== undefined) {
          statusCounts[visit.status]++;
        }
      });

      // Update visitsData for the chart
      setVisitsData({
        labels: ["Scheduled", "Ongoing", "Completed", "Confirmed"],
        datasets: [
          {
            data: [
              statusCounts.Scheduled,
              statusCounts.Ongoing,
              statusCounts.Completed,
              statusCounts.Confirmed,
            ],
            backgroundColor: ["#ffc107", "#17a2b8", "#28a745", "#007bff"],
            borderColor: ["#fff", "#fff", "#fff", "#fff"],
            borderWidth: 2,
          },
        ],
      });
    };

    fetchVisits();
  }, []); // Empty dependency array to fetch visits once on mount

  const [carers, setCarers] = useState([]); // State to hold carers data
  const [carerloading, setCarerLoading] = useState(true);

  const [carersData, setCarersData] = useState({
    labels: ["FullTime", "PartTime", "Contract"],
    datasets: [
      {
        data: [0, 0, 0], // Initializing counts with 0 for Fulltime and PartTime
        backgroundColor: ["#28a745", "#6c757d"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  });

  // Fetch carers and update chart data
  useEffect(() => {
    const fetchCarers = async () => {
      console.log("Fetching carers");

      try {
        const response = await CarerService.getAllCarers(); // Adjust the API call to fetch carers
        console.log(response.data);

        setCarers(response.data || []); // Store the fetched carers in state
        updateCarersData(response.data || []); // Update carers data for the chart
      } catch (err) {
        setError(err.message || "Error fetching carers");
      } finally {
        setCarerLoading(false);
      }
    };

    // Filter the carers by their type (Fulltime and PartTime) and update the chart data
    const updateCarersData = (carersArray) => {
      const statusCounts = {
        FullTime: 0,
        PartTime: 0,
        Contract: 0,
      };

      // Count carers based on their work type
      carersArray.forEach((carer) => {
        if (statusCounts[carer.employmentType] !== undefined) {
          statusCounts[carer.employmentType]++;
        }
      });

      // Update carersData for the chart
      setCarersData({
        labels: ["Fulltime", "PartTime"],
        datasets: [
          {
            data: [
              statusCounts.FullTime,
              statusCounts.PartTime,
              statusCounts.Contract,
            ],
            backgroundColor: ["#28a745", "#6c757d"],
            borderColor: ["#fff", "#fff"],
            borderWidth: 2,
          },
        ],
      });
    };

    fetchCarers(); // Fetch carers data on component mount
  }, []); // Empty dependency array to run the effect only once when component mounts

  // const carexrsData = {
  //   labels: ["Active", "On Leave", "In Training", "New Hires"],
  //   datasets: [
  //     {
  //       data: [23, 5, 8, 3],
  //       backgroundColor: ["#28a745", "#6c757d", "#17a2b8", "#007bff"],
  //       borderColor: ["#fff", "#fff", "#fff", "#fff"],
  //       borderWidth: 2,
  //     },
  //   ],
  // };

  //Clients Data
  const [clientError, setClientError] = useState(null);
  const [clients, setClients] = useState([]);
  const [clientLoading, setClientLoading] = useState(true);

  // Initializing clientsData, will be updated after fetching data
  const [clientsData, setClientsData] = useState({
    labels: ["Male", "Female"],
    datasets: [
      {
        data: [0, 0], // Initializing counts with 0
        backgroundColor: ["#007bff", "#dc3545"],
        borderColor: ["#fff", "#fff"],
        borderWidth: 2,
      },
    ],
  });

  // Fetch clients and update chart data
  useEffect(() => {
    const fetchClients = async () => {
      console.log("Fetching clients");

      try {
        const response = await ClientService.getAllClient();
        console.log(response.data);

        setClients(response.data || []);
        updateClientsData(response.data || []);
      } catch (err) {
        setClientError(err.message || "Error fetching clients");
      } finally {
        setClientLoading(false);
      }
    };

    // Count clients based on gender and update chart
    const updateClientsData = (clientsArray) => {
      const genderCounts = { Male: 0, Female: 0 };

      clientsArray.forEach((client) => {
        if (genderCounts[client.gender] !== undefined) {
          genderCounts[client.gender]++;
        }
      });

      setClientsData({
        labels: ["Male", "Female"],
        datasets: [
          {
            data: [genderCounts.Male, genderCounts.Female],
            backgroundColor: ["#007bff", "#dc3545"],
            borderColor: ["#fff", "#fff"],
            borderWidth: 2,
          },
        ],
      });
    };

    fetchClients();
  }, []); // Fetch clients once on component mount

  return (
    <>
      <Container className="mt--7" fluid>
        {/* Overview Stats */}
        <Row className="mb-4">
          <Col lg="3">
            <Card className="card-stats mb-4 mb-xl-0 shadow">
              <CardBody>
                <Row>
                  <div className="col">
                    <h5 className="text-uppercase text-muted mb-0">
                      Total Visits
                    </h5>
                    <span className="h2 font-weight-bold mb-0">
                      {" "}
                      {visits.length}{" "}
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                      <ClockCircleOutlined />
                    </div>
                  </Col>
                </Row>
                {/* <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-success mr-2">
                    <i className="fa fa-arrow-up"></i> 12%
                  </span>
                  <span className="text-nowrap">Since last month</span>
                </p> */}
              </CardBody>
            </Card>
          </Col>
          <Col lg="3">
            <Card className="card-stats mb-4 mb-xl-0 shadow">
              <CardBody>
                <Row>
                  <div className="col">
                    <h5 className="text-uppercase text-muted mb-0">
                      Active Carers
                    </h5>
                    <span className="h2 font-weight-bold mb-0">
                      {carers.length}
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-primary text-white rounded-circle shadow">
                      <UserOutlined />
                    </div>
                  </Col>
                </Row>
                {/* <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-success mr-2">
                    <i className="fa fa-arrow-up"></i> 3%
                  </span>
                  <span className="text-nowrap">Since last month</span>
                </p> */}
              </CardBody>
            </Card>
          </Col>
          <Col lg="3">
            <Card className="card-stats mb-4 mb-xl-0 shadow">
              <CardBody>
                <Row>
                  <div className="col">
                    <h5 className="text-uppercase text-muted mb-0">
                      Total Clients
                    </h5>
                    <span className="h2 font-weight-bold mb-0">
                      {clients.length}
                    </span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                      <TeamOutlined />
                    </div>
                  </Col>
                </Row>
                {/* <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-success mr-2">
                    <i className="fa fa-arrow-up"></i> 8%
                  </span>
                  <span className="text-nowrap">Since last month</span>
                </p> */}
              </CardBody>
            </Card>
          </Col>
          <Col lg="3">
            <Card className="card-stats mb-4 mb-xl-0 shadow">
              <CardBody>
                <Row>
                  <div className="col">
                    <h5 className="text-uppercase text-muted mb-0">Revenue</h5>
                    <span className="h2 font-weight-bold mb-0">$17,200</span>
                  </div>
                  <Col className="col-auto">
                    <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                      <DollarOutlined />
                    </div>
                  </Col>
                </Row>
                <p className="mt-3 mb-0 text-muted text-sm">
                  <span className="text-success mr-2">
                    <i className="fa fa-arrow-up"></i> 10%
                  </span>
                  <span className="text-nowrap">Since last month</span>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* Visits Data */}
          <Col lg="4">
            <Card className="shadow mb-4">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Visits Overview</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" size="sm">
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div style={{ height: "250px" }}>
                  <Doughnut data={visitsData} options={chartOptions} />
                </div>
                <Table
                  className="align-items-center table-flush mt-4"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Status</th>
                      <th scope="col">Count</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        <Badge color="warning" pill>
                          Scheduled
                        </Badge>
                      </th>
                      <td>
                        {
                          visits.filter((visit) => visit.status === "Scheduled")
                            .length
                        }
                      </td>
                      <td>
                        <Button color="link" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Badge color="info" pill>
                          Ongoing
                        </Badge>
                      </th>

                      <td>
                        {
                          visits.filter((visit) => visit.status === "Ongoing")
                            .length
                        }
                      </td>
                      <td>
                        <Button color="link" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Badge color="primary" pill>
                          Confirmed
                        </Badge>
                      </th>

                      <td>
                        {
                          visits.filter((visit) => visit.status === "Confirmed")
                            .length
                        }
                      </td>
                      <td>
                        <Button color="link" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <Badge color="success" pill>
                          Completed
                        </Badge>
                      </th>
                      <td>
                        {
                          visits.filter((visit) => visit.status === "Completed")
                            .length
                        }
                      </td>
                      <td>
                        <Button color="link" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          {/* Carers Data */}
          <Col lg="4">
            <Card className="shadow mb-4">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Carers Overview</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" size="sm">
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div style={{ height: "250px" }}>
                  <PieChart data={carersData} options={chartOptions} />
                </div>
                <Table
                  className="align-items-center table-flush mt-4"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Status</th>
                      <th scope="col">Count</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Full-Time</th>
                      <td>
                        {
                          carers.filter(
                            (carer) => carer.employmentType === "FullTime"
                          ).length
                        }
                      </td>
                      <td>
                        <Button color="link" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Part-Time</th>
                      <td>
                        {
                          carers.filter(
                            (carer) => carer.employmentType === "PartTime"
                          ).length
                        }
                      </td>
                      <td>
                        <Button color="link" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Contract</th>
                      <td>
                        {
                          carers.filter(
                            (carer) => carer.employmentType === "Contract"
                          ).length
                        }
                      </td>
                      <td>
                        <Button color="link" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                    {/* <tr>
                      <th scope="row">In Training</th>
                      <td>8</td>
                      <td>
                        <Button color="link" size="sm">
                          View
                        </Button>
                      </td>
                    </tr> */}
                    {/* <tr>
                      <th scope="row">New Hires</th>
                      <td>3</td>
                      <td>
                        <Button color="link" size="sm">
                          View
                        </Button>
                      </td>
                    </tr> */}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          {/* Clients Data */}
          <Col lg="4">
            <Card className="shadow mb-4">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Clients Overview</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" size="sm">
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div style={{ height: "250px" }}>
                  <PieChart data={clientsData} options={chartOptions} />
                </div>
                <Table
                  className="align-items-center table-flush mt-4"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Category</th>
                      <th scope="col">Count</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Male</th>

                      <td>
                        {
                          clients.filter((client) => client.gender === "Male")
                            .length
                        }
                      </td>
                      <td>
                        <Button color="link" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Female</th>
                      <td>
                        {
                          clients.filter((client) => client.gender === "Female")
                            .length
                        }
                      </td>
                      <td>
                        <Button color="link" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>

                    {/* <tr>
                      <th scope="row">Occasional Care</th>
                      <td>18</td>
                      <td>
                        <Button color="link" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">New Clients</th>
                      <td>7</td>
                      <td>
                        <Button color="link" size="sm">
                          View
                        </Button>
                      </td>
                    </tr> */}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* Finance Data */}
          <Col lg="8">
            <Card className="shadow mb-4">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Financial Overview</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" size="sm">
                      Download Report
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div style={{ height: "300px" }}>
                  <BarChart
                    data={financeData}
                    options={{
                      ...chartOptions,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: "Amount (USD)",
                          },
                        },
                        x: {
                          title: {
                            display: true,
                            text: "Month",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <Table
                  className="align-items-center table-flush mt-4"
                  responsive
                >
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Month</th>
                      <th scope="col">Revenue</th>
                      <th scope="col">Expenses</th>
                      <th scope="col">Profit</th>
                      <th scope="col">Profit Margin</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">January</th>
                      <td>$12,500</td>
                      <td>$10,200</td>
                      <td>$2,300</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">18.4%</span>
                          <div>
                            <Progress max="100" value="18" color="success" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">February</th>
                      <td>$13,200</td>
                      <td>$11,000</td>
                      <td>$2,200</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">16.7%</span>
                          <div>
                            <Progress max="100" value="17" color="success" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">March</th>
                      <td>$14,800</td>
                      <td>$10,800</td>
                      <td>$4,000</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">27.0%</span>
                          <div>
                            <Progress max="100" value="27" color="success" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">April</th>
                      <td>$13,900</td>
                      <td>$11,200</td>
                      <td>$2,700</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <span className="mr-2">19.4%</span>
                          <div>
                            <Progress max="100" value="19" color="success" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>

          {/* Runners Data */}
          <Col lg="4">
            <Card className="shadow mb-4">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Runners Performance</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" size="sm">
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Active</th>
                      <th scope="col">Completed</th>
                      <th scope="col">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {runnersData.map((runner, index) => (
                      <tr key={index}>
                        <th scope="row">{runner.name}</th>
                        <td>{runner.activeJobs}</td>
                        <td>{runner.completedToday}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="mr-2">{runner.rating}</span>
                            <div>
                              <Progress
                                max="5"
                                value={runner.rating}
                                color="info"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="text-center mt-4">
                  <PrimaryButton title="Manage Runners" />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          {/* Unassigned Appointments */}
          <Col xl="8">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Unassigned Appointments</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" size="sm">
                      Create New
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <Row className="align-items-center mb-3">
                  <div className="col">
                    <h4 className="mb-0" style={{ color: "blue" }}>
                      Choose unassigned appointments for
                    </h4>
                  </div>
                  <div className="col text-right">
                    <Search
                      placeholder="10:20 - 11:30"
                      enterButton="Go"
                      size="large"
                      suffix={suffix}
                      onSearch={onSearch}
                    />
                  </div>
                </Row>

                <HomeTable />
              </CardBody>
            </Card>
          </Col>

          {/* Alerts and Notifications */}
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Alerts</h3>
                  </div>
                  <div className="col text-right">
                    <Button color="link" size="sm">
                      View All
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="alert alert-danger" role="alert">
                  <strong>Critical:</strong> 8 client appointments unassigned
                  for tomorrow
                </div>
                <div className="alert alert-warning" role="alert">
                  <strong>Warning:</strong> 3 carers have training
                  certifications expiring this week
                </div>
                <div className="alert alert-warning" role="alert">
                  <strong>Warning:</strong> 5 medication reviews are overdue
                </div>
                <div className="alert alert-info" role="alert">
                  <strong>Info:</strong> Monthly financial report is ready for
                  review
                </div>
                <div className="alert alert-info" role="alert">
                  <strong>Info:</strong> 2 new client applications pending
                  review
                </div>
              </CardBody>
            </Card>

            <Card className="shadow mt-4">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Upcoming Events</h3>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Staff Meeting
                    <span className="badge badge-primary badge-pill">
                      Today, 2:00 PM
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    First Aid Training
                    <span className="badge badge-primary badge-pill">
                      Tomorrow, 10:00 AM
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Quarterly Review
                    <span className="badge badge-primary badge-pill">
                      Mar 5, 9:00 AM
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Client Feedback Session
                    <span className="badge badge-primary badge-pill">
                      Mar 7, 3:30 PM
                    </span>
                  </li>
                </ul>
                <div className="text-center mt-3">
                  <PrimaryButton title="Schedule New Event" />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MyDashboard;
